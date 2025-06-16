"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react"
import Link from "next/link"

const quizQuestions = [
  {
    id: 1,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es la primera fase del ciclo de vida de ML supervisado?",
    options: ["Recolección de datos", "Definición del problema", "Preparación de datos", "Selección del modelo"],
    correct: 1,
    explanation:
      "La definición del problema es crucial porque una definición imprecisa conduce a errores críticos en todo el proceso.",
  },
  {
    id: 2,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Es recomendable usar el conjunto de prueba durante el entrenamiento del modelo?",
    correct: false,
    explanation:
      "No, el conjunto de prueba debe mantenerse separado para evaluar la capacidad de generalización del modelo con datos no vistos.",
  },
  {
    id: 3,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué porcentaje de datos se recomienda típicamente para entrenamiento?",
    options: ["50-60%", "60-70%", "70-80%", "80-90%"],
    correct: 2,
    explanation: "Se recomienda usar 70-80% de los datos para entrenamiento y 20-30% para prueba.",
  },
  {
    id: 4,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿SMOTE es una técnica para balancear clases desbalanceadas?",
    correct: true,
    explanation:
      "SMOTE (Synthetic Minority Oversampling Technique) aumenta la clase minoritaria con registros sintéticos.",
  },
  {
    id: 5,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál NO es una técnica de ML no supervisado?",
    options: ["Clustering", "Reducción de dimensionalidad", "Regresión lineal", "Reglas de asociación"],
    correct: 2,
    explanation: "La regresión lineal es una técnica de ML supervisado que requiere datos etiquetados.",
  },
  {
    id: 6,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿K-Means es un algoritmo de caja negra?",
    correct: false,
    explanation:
      "K-Means es un algoritmo de caja blanca porque es interpretable y se puede entender cómo agrupa los datos.",
  },
  {
    id: 7,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué algoritmo es mejor para detectar clusters de forma arbitraria?",
    options: ["K-Means", "DBSCAN", "PCA", "Apriori"],
    correct: 1,
    explanation:
      "DBSCAN puede encontrar clusters de forma arbitraria y detectar outliers, a diferencia de K-Means que asume clusters esféricos.",
  },
  {
    id: 8,
    type: "boolean",
    category: "Métricas",
    question: "¿El coeficiente de silueta puede tener valores negativos?",
    correct: true,
    explanation:
      "Sí, el coeficiente de silueta tiene rango [-1, 1]. Valores negativos indican mala asignación de clusters.",
  },
  {
    id: 9,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué mide el 'Lift' en reglas de asociación?",
    options: [
      "La frecuencia del conjunto de elementos",
      "La probabilidad condicional",
      "Cuánto más probable es B cuando ocurre A",
      "La correlación entre variables",
    ],
    correct: 2,
    explanation: "Lift mide cuánto más probable es B cuando ocurre A, comparado con la probabilidad base de B.",
  },
  {
    id: 10,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Grid Search prueba todas las combinaciones posibles de hiperparámetros?",
    correct: true,
    explanation:
      "Grid Search prueba exhaustivamente todas las combinaciones definidas, mientras que Random Search prueba combinaciones aleatorias.",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = () => {
    if (!selectedAnswer) return

    let isCorrect = false

    if (question.type === "multiple") {
      isCorrect = Number.parseInt(selectedAnswer) === question.correct
    } else {
      isCorrect = (selectedAnswer === "true") === question.correct
    }

    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
  }

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 90) return "¡Excelente! Dominas muy bien los conceptos"
    if (percentage >= 80) return "¡Muy bien! Tienes un buen conocimiento"
    if (percentage >= 70) return "Bien, pero puedes mejorar con más estudio"
    if (percentage >= 60) return "Regular, necesitas repasar más los conceptos"
    return "Necesitas estudiar más antes de continuar"
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl">¡Quiz Completado!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`text-4xl font-bold ${getScoreColor()}`}>
                  {score}/{quizQuestions.length}
                </div>
                <div className="text-lg text-gray-600">
                  {((score / quizQuestions.length) * 100).toFixed(0)}% de aciertos
                </div>
                <div className="text-gray-700">{getScoreMessage()}</div>

                {/* Detailed Results */}
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
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Intentar de nuevo
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
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
            <h1 className="text-3xl font-bold text-gray-900">Quiz ML</h1>
          </div>
          <div className="text-sm text-gray-600">
            Puntuación: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Pregunta {currentQuestion + 1} de {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-500">{question.category}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {question.type === "multiple" ? (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true" className="cursor-pointer">
                    Verdadero
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false" className="cursor-pointer">
                    Falso
                  </Label>
                </div>
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        {showResult && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                {answers[answers.length - 1] ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold ${answers[answers.length - 1] ? "text-green-600" : "text-red-600"}`}>
                  {answers[answers.length - 1] ? "¡Correcto!" : "Incorrecto"}
                </span>
              </div>
              <p className="text-gray-700">{question.explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <Button onClick={handleAnswer} disabled={!selectedAnswer} className="px-8">
              Responder
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="px-8">
              {currentQuestion < quizQuestions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
            </Button>
          )}
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Instrucciones</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Lee cuidadosamente cada pregunta</li>
              <li>• Selecciona la respuesta que consideres correcta</li>
              <li>• Después de responder verás la explicación</li>
              <li>• Al final obtendrás tu puntuación total</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
