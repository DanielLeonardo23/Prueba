"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Brain, Target, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🧠 ML Study Master</h1>
          <p className="text-xl text-gray-600">Domina Machine Learning con cuestionarios, resúmenes y IA</p>
        </div>

        {/* Main Tools */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Cuestionarios */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-red-500">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl">Cuestionarios</CardTitle>
              <CardDescription>150 preguntas aleatorias</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Más de 150 preguntas extraídas de los PDFs. Filtra por categoría y tipo de pregunta.
              </p>
              <Link href="/quiz">
                <Button size="sm" className="w-full">
                  Comenzar Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Preguntas IA */}
          <Card className="hover:shadow-lg transition-shadow border-purple-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-purple-500">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl">Preguntas IA</CardTitle>
              <CardDescription>Generadas con Gemini</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Preguntas únicas generadas por IA con formato ABCDE y explicaciones detalladas.
              </p>
              <Link href="/ai-questions">
                <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  Generar con IA
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Resúmenes */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-indigo-500">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl">Resúmenes</CardTitle>
              <CardDescription>Contenido completo</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Resúmenes extensos con organizadores gráficos y ejemplos prácticos.
              </p>
              <Link href="/summaries">
                <Button size="sm" className="w-full" variant="outline">
                  Ver Resúmenes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">10</div>
              <div className="text-sm text-gray-600">Fases ML Supervisado</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Técnicas No Supervisado</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">150</div>
              <div className="text-sm text-gray-600">Preguntas Totales</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Preguntas IA</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
