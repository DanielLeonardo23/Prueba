"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BookOpen, Brain, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🧠 ML Study Master</h1>
          <p className="text-xl text-gray-600">Domina Machine Learning con cuestionarios y resúmenes</p>
        </div>

        {/* Main Tools */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Cuestionarios */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-red-500">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">Cuestionarios</CardTitle>
              <CardDescription className="text-lg">Preguntas aleatorias de los 3 PDFs</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Más de 30 preguntas aleatorias extraídas directamente de los PDFs de Machine Learning. Filtra por
                categoría o practica con todas mezcladas.
              </p>
              <Link href="/quiz">
                <Button size="lg" className="w-full">
                  Comenzar Cuestionario
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
              <CardTitle className="text-2xl">Resúmenes</CardTitle>
              <CardDescription className="text-lg">Conceptos clave de los PDFs organizados</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Resúmenes estructurados con lo más importante de cada PDF: ML Supervisado, ML No Supervisado y Métricas
                de Evaluación.
              </p>
              <Link href="/summaries">
                <Button size="lg" className="w-full" variant="outline">
                  Ver Resúmenes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
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
              <div className="text-2xl font-bold text-purple-600">30+</div>
              <div className="text-sm text-gray-600">Preguntas Aleatorias</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
