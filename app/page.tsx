"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, Target, BarChart3, FileText, Zap, Trophy, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [progress, setProgress] = useState(0)
  const [studyTime, setStudyTime] = useState(0)

  useEffect(() => {
    // Simular progreso basado en localStorage
    const savedProgress = localStorage.getItem("ml-study-progress")
    if (savedProgress) {
      setProgress(Number.parseInt(savedProgress))
    }

    const savedTime = localStorage.getItem("ml-study-time")
    if (savedTime) {
      setStudyTime(Number.parseInt(savedTime))
    }
  }, [])

  const studyModules = [
    {
      title: "ML Supervisado",
      description: "Ciclo de vida completo de modelos supervisados",
      icon: Target,
      href: "/supervised",
      color: "bg-blue-500",
      topics: 10,
    },
    {
      title: "ML No Supervisado",
      description: "Clustering, reducción de dimensionalidad y reglas",
      icon: Brain,
      href: "/unsupervised",
      color: "bg-green-500",
      topics: 8,
    },
    {
      title: "Métricas de Evaluación",
      description: "Métricas para algoritmos no supervisados",
      icon: BarChart3,
      href: "/metrics",
      color: "bg-purple-500",
      topics: 6,
    },
  ]

  const studyTools = [
    {
      title: "Flashcards",
      description: "Tarjetas de memoria interactivas",
      icon: Zap,
      href: "/flashcards",
      color: "bg-orange-500",
    },
    {
      title: "Cuestionarios",
      description: "Preguntas de opción múltiple y V/F",
      icon: FileText,
      href: "/quiz",
      color: "bg-red-500",
    },
    {
      title: "Resúmenes",
      description: "Conceptos clave organizados",
      icon: BookOpen,
      href: "/summaries",
      color: "bg-indigo-500",
    },
    {
      title: "Visualizaciones",
      description: "Gráficos y diagramas explicativos",
      icon: BarChart3,
      href: "/visualizations",
      color: "bg-teal-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🧠 ML Study Master</h1>
          <p className="text-xl text-gray-600">Domina Machine Learning con técnicas de estudio optimizadas</p>
        </div>

        {/* Progress Dashboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Tu Progreso de Estudio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progreso General</span>
                  <span className="text-sm text-gray-500">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Tiempo de estudio: {studyTime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm">Meta diaria: 30 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Módulos de Estudio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studyModules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.color}`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.topics} temas</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                  <Link href={module.href}>
                    <Button className="w-full">Estudiar Ahora</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Tools */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Herramientas de Estudio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${tool.color}`}>
                      <tool.icon className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-base">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-gray-600 mb-3">{tool.description}</p>
                  <Link href={tool.href}>
                    <Button size="sm" variant="outline" className="w-full">
                      Usar Herramienta
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Conceptos Clave</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">150+</div>
              <div className="text-sm text-gray-600">Flashcards</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">80+</div>
              <div className="text-sm text-gray-600">Preguntas</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-sm text-gray-600">Visualizaciones</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
