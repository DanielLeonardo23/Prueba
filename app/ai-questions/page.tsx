"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Brain, Loader2, CheckCircle, XCircle, Sparkles, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface AIQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
  source: string
}

interface APIResponse {
  questions: AIQuestion[]
  message: string
  success?: boolean
  warning?: string
  error?: string
}

export default function AIQuestionsPage() {
  const [selectedPDF, setSelectedPDF] = useState<string>("all")
  const [numQuestions, setNumQuestions] = useState<number>(5)
  const [questions, setQuestions] = useState<AIQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string>("")
  const [warning, setWarning] = useState<string>("")

  const pdfOptions = [
    { value: "all", label: "Todos los PDFs", description: "Preguntas de ML Supervisado, No Supervisado y Métricas" },
    { value: "supervised", label: "PDF 1: ML Supervisado", description: "Ciclo de vida, pipelines, MLOps" },
    {
      value: "unsupervised",
      label: "PDF 2: ML No Supervisado",
      description: "Clustering, reducción, reglas de asociación",
    },
    { value: "metrics", label: "PDF 3: Métricas", description: "Evaluación de algoritmos no supervisados" },
  ]

  const generateQuestions = async () => {
    setIsGenerating(true)
    setError("")
    setWarning("")

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: selectedPDF,
          count: numQuestions,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data: APIResponse = await response.json()

      if (data.error) {
        setError(data.error)
      }

      if (data.warning) {
        setWarning(data.warning)
      }

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions)
        setCurrentQuestion(0)
        setScore(0)
        setAnswers([])
        setQuizCompleted(false)
        setShowResult(false)
        setSelectedAnswer("")
      } else {
        throw new Error("No se recibieron preguntas válidas")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(`Error al generar preguntas: ${errorMessage}`)
      console.error("Error generating questions:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAnswer = () => {
    if (!selectedAnswer || !questions[currentQuestion]) return

    const isCorrect = Number.parseInt(selectedAnswer) === questions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setQuestions([])
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setError("")
    setWarning("")
  }

  const getScoreColor = () => {
    if (questions.length === 0) return "text-gray-600"
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    if (questions.length === 0) return ""
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "¡Excelente! Dominas muy bien los conceptos"
    if (percentage >= 80) return "¡Muy bien! Tienes un buen conocimiento"
    if (percentage >= 70) return "Bien, pero puedes mejorar con más estudio"
    if (percentage >= 60) return "Regular, necesitas repasar más los conceptos"
    return "Necesitas estudiar más antes de continuar"
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Sparkles className="w-16 h-16 text-purple-500" />
              </div>
              <CardTitle className="text-2xl">¡Quiz IA Completado!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`text-4xl font-bold ${getScoreColor()}`}>
                  {score}/{questions.length}
                </div>
                <div className="text-lg text-gray-600">
                  {((score / questions.length) * 100).toFixed(0)}% de aciertos
                </div>
                <div className="text-gray-700">{getScoreMessage()}</div>

                {warning && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">{warning}</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-2">
                  <h3 className="font-semibold">Resultados por pregunta:</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {answers.map((correct, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          correct ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 justify-center mt-6">
                  <Button onClick={resetQuiz}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar Nuevas Preguntas
                  </Button>
                  <Link href="/">
                    <Button variant="outline">Volver al inicio</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (questions.length > 0) {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Preguntas Generadas con IA</h1>
            </div>
            <div className="text-sm text-gray-600">
              Puntuación: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
          </div>

          {/* Warning */}
          {warning && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-yellow-800">{warning}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <span className="text-sm text-purple-600 font-medium">{question.source}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 leading-relaxed">
                      <span className="font-bold text-purple-700 mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                      <span className="text-gray-800">{option}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Result */}
          {showResult && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {answers[answers.length - 1] ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span
                    className={`font-bold text-lg ${answers[answers.length - 1] ? "text-green-600" : "text-red-600"}`}
                  >
                    {answers[answers.length - 1] ? "¡Correcto!" : "Incorrecto"}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    Respuesta correcta: <span className="font-bold">{String.fromCharCode(65 + question.correct)}</span>
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-l-purple-500">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    Explicación detallada:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!showResult ? (
              <Button onClick={handleAnswer} disabled={!selectedAnswer} className="px-8 py-3" size="lg">
                Responder
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="px-8 py-3" size="lg">
                {currentQuestion < questions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Preguntas Generadas con IA</h1>
          <Brain className="w-8 h-8 text-purple-600" />
        </div>

        {/* Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Generador Inteligente de Preguntas con Gemini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Utiliza la IA de Google Gemini para generar preguntas personalizadas basadas en el contenido específico de
              los PDFs. Las preguntas incluyen 5 opciones (A-E) con explicaciones detalladas generadas automáticamente.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Formato ABCDE estándar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Explicaciones detalladas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Contenido específico por PDF</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Configuración del Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* PDF Selection */}
            <div>
              <h3 className="font-semibold mb-3">📚 Seleccionar Fuente de Contenido:</h3>
              <div className="grid gap-3">
                {pdfOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPDF === option.value
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    onClick={() => setSelectedPDF(option.value)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pdf"
                        value={option.value}
                        checked={selectedPDF === option.value}
                        onChange={() => setSelectedPDF(option.value)}
                        className="text-purple-600"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <h3 className="font-semibold mb-3">🔢 Número de Preguntas:</h3>
              <div className="flex gap-2 flex-wrap">
                {[3, 5, 8, 10, 15].map((num) => (
                  <Button
                    key={num}
                    variant={numQuestions === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNumQuestions(num)}
                  >
                    {num} preguntas
                  </Button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button
                onClick={generateQuestions}
                disabled={isGenerating}
                className="w-full md:w-auto px-8 py-3"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generando con Gemini...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generar Preguntas con IA
                  </>
                )}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Error:</span>
                </div>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Características del Generador IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-700 mb-3">Capacidades Avanzadas:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Análisis profundo del contenido de cada PDF
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Generación de distractores plausibles y educativos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Explicaciones contextualizadas y detalladas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Variedad en tipos de preguntas (conceptual, aplicación, análisis)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-3">Ventajas del Sistema:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Preguntas únicas en cada generación
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Adaptación al nivel de dificultad del contenido
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Cobertura completa de temas importantes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    Retroalimentación educativa inmediata
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
