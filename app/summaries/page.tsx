"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Target, Brain, BarChart3, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const summaryData = {
  supervised: {
    title: "Machine Learning Supervisado",
    icon: Target,
    color: "bg-blue-500",
    keyPoints: [
      "Proceso sistemático de 10 fases para desarrollar modelos que aprenden de datos etiquetados",
      "Requiere datos con variable objetivo (etiqueta) conocida",
      "División típica: 70-80% entrenamiento, 20-30% prueba",
      "Uso de pipelines para mantener reproducibilidad",
      "Validación cruzada para estimación robusta del rendimiento",
    ],
    phases: [
      {
        phase: "1. Definición del Problema",
        key: "Traducir problema de negocio a tarea de ML",
        details: [
          "Determinar: clasificación o regresión",
          "Definir variable objetivo (etiqueta)",
          "Identificar variables de entrada (features)",
          "Establecer métricas de éxito",
        ],
      },
      {
        phase: "2. Recolección de Datos",
        key: "Reunir datos etiquetados necesarios",
        details: [
          "Localizar fuentes internas/externas",
          "Validar instancias etiquetadas",
          "Asegurar volumen y representatividad",
          "Documentar origen y tipo de datos",
        ],
      },
      {
        phase: "3. Preparación de Datos",
        key: "Limpiar y transformar datos",
        details: [
          "Limpieza: valores nulos/inconsistentes",
          "Transformación: categóricas → numéricas",
          "Escalado/normalización si necesario",
          "SMOTE para balancear clases",
        ],
      },
      {
        phase: "4. División del Conjunto",
        key: "Separar datos: entrenamiento vs prueba",
        details: [
          "70-80% para entrenamiento",
          "20-30% para prueba",
          "Mantener proporcionalidad de clases",
          "Usar train_test_split con stratify",
        ],
      },
      {
        phase: "5. Selección del Modelo",
        key: "Elegir algoritmo más adecuado",
        details: [
          "Considerar tipo de problema",
          "Volumen de datos disponible",
          "Necesidad de interpretabilidad",
          "Recursos computacionales",
        ],
      },
      {
        phase: "6-10. Entrenamiento → Mantenimiento",
        key: "Desde ajuste hasta producción",
        details: [
          "Entrenamiento: modelo.fit(X_train, y_train)",
          "Evaluación con datos de prueba",
          "Optimización: Grid/Random Search",
          "Implementación: serialización y API",
          "Mantenimiento: monitoreo y reentrenamiento",
        ],
      },
    ],
  },
  unsupervised: {
    title: "Machine Learning No Supervisado",
    icon: Brain,
    color: "bg-green-500",
    keyPoints: [
      "Descubre patrones ocultos en datos sin etiquetas",
      "3 técnicas principales: Clustering, Reducción de dimensionalidad, Reglas de asociación",
      "Evaluación más subjetiva que ML supervisado",
      "Algoritmos de caja blanca (interpretables) vs caja negra",
      "Aplicaciones: segmentación, visualización, recomendaciones",
    ],
    techniques: [
      {
        name: "Clustering (Agrupamiento)",
        description: "Agrupar datos similares en conjuntos",
        algorithms: [
          {
            name: "K-Means",
            type: "Caja Blanca",
            use: "Segmentación de clientes, grupos esféricos",
            characteristics: "Divide en k clusters, actualiza centroides iterativamente",
          },
          {
            name: "DBSCAN",
            type: "Caja Blanca",
            use: "Detección de anomalías, clusters arbitrarios",
            characteristics: "Agrupa puntos densamente conectados, marca ruido",
          },
          {
            name: "Clustering Jerárquico",
            type: "Caja Blanca",
            use: "Visualización de estructuras",
            characteristics: "Crea jerarquía mediante fusiones/divisiones",
          },
        ],
      },
      {
        name: "Reducción de Dimensionalidad",
        description: "Representar datos en espacios de menor dimensión",
        algorithms: [
          {
            name: "PCA",
            type: "Caja Blanca",
            use: "Visualización, preprocesamiento",
            characteristics: "Componentes principales que capturan máxima varianza",
          },
          {
            name: "t-SNE",
            type: "Caja Negra",
            use: "Visualización 2D/3D",
            characteristics: "Preserva relaciones locales, técnica no lineal",
          },
          {
            name: "UMAP",
            type: "Caja Negra",
            use: "Visualización, preprocesamiento",
            characteristics: "Preserva estructura local y global",
          },
        ],
      },
      {
        name: "Reglas de Asociación",
        description: "Identificar relaciones entre variables",
        algorithms: [
          {
            name: "Apriori",
            type: "Caja Blanca",
            use: "Market basket analysis, recomendaciones",
            characteristics: "Encuentra conjuntos frecuentes, genera reglas",
          },
        ],
      },
    ],
    conditions: [
      "Datos sin etiquetar disponibles",
      "Objetivo de exploración/descubrimiento",
      "Necesidad de reducir complejidad",
      "Segmentación de usuarios/productos",
      "Detección de patrones ocultos",
    ],
  },
  metrics: {
    title: "Métricas de Evaluación",
    icon: BarChart3,
    color: "bg-purple-500",
    keyPoints: [
      "Métricas específicas para evaluar algoritmos no supervisados",
      "Diferentes rangos e interpretaciones según la técnica",
      "Coeficiente de Silueta: métrica principal para clustering",
      "Varianza Explicada: clave para reducción de dimensionalidad",
      "Soporte, Confianza y Lift: fundamentales en reglas de asociación",
    ],
    categories: [
      {
        name: "Métricas de Clustering",
        metrics: [
          {
            name: "Coeficiente de Silueta",
            formula: "s(i) = (b(i) - a(i)) / max(a(i), b(i))",
            range: "[-1, 1]",
            interpretation: "Cercano a 1: buena asignación, cercano a -1: mala asignación",
            use: "Evaluar calidad de clusters",
          },
          {
            name: "Índice Calinski-Harabasz",
            formula: "CH = (SSB/(k-1)) / (SSW/(n-k))",
            range: "[0, ∞)",
            interpretation: "Valores más altos indican mejor clustering",
            use: "Comparar diferentes números de clusters",
          },
          {
            name: "Índice Davies-Bouldin",
            formula: "DB = (1/k) Σ max((σi + σj)/d(ci,cj))",
            range: "[0, ∞)",
            interpretation: "Valores más bajos indican mejor clustering",
            use: "Evaluar separación entre clusters",
          },
        ],
      },
      {
        name: "Métricas de Reducción de Dimensionalidad",
        metrics: [
          {
            name: "Error de Reconstrucción",
            formula: "RE = ||X - X̂||²",
            range: "[0, ∞)",
            interpretation: "Menor error = mejor preservación de información",
            use: "Evaluar pérdida de información en PCA",
          },
          {
            name: "Varianza Explicada",
            formula: "VE = Σλi / Σλtotal",
            range: "[0, 1]",
            interpretation: "Proporción de varianza preservada",
            use: "Determinar número de componentes en PCA",
          },
        ],
      },
      {
        name: "Métricas de Reglas de Asociación",
        metrics: [
          {
            name: "Soporte",
            formula: "Support(A) = |A| / |D|",
            range: "[0, 1]",
            interpretation: "Frecuencia del conjunto de elementos",
            use: "Filtrar conjuntos poco frecuentes",
          },
          {
            name: "Confianza",
            formula: "Confidence(A→B) = Support(A∪B) / Support(A)",
            range: "[0, 1]",
            interpretation: "Probabilidad condicional P(B|A)",
            use: "Evaluar fuerza de la regla",
          },
          {
            name: "Lift",
            formula: "Lift(A→B) = Confidence(A→B) / Support(B)",
            range: "[0, ∞)",
            interpretation: ">1: asociación positiva, <1: negativa, =1: independencia",
            use: "Medir mejora sobre probabilidad base",
          },
        ],
      },
    ],
  },
}

export default function SummariesPage() {
  const [activeTab, setActiveTab] = useState("supervised")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Resúmenes ML</h1>
          <BookOpen className="w-8 h-8 text-indigo-600" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="supervised" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              ML Supervisado
            </TabsTrigger>
            <TabsTrigger value="unsupervised" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              ML No Supervisado
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Métricas
            </TabsTrigger>
          </TabsList>

          {/* ML Supervisado */}
          <TabsContent value="supervised" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  {summaryData.supervised.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Puntos Clave */}
                <div className="mb-6">
                  <h3 className="font-semibold text-blue-700 mb-3">📋 Puntos Clave:</h3>
                  <div className="space-y-2">
                    {summaryData.supervised.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fases */}
                <div className="grid gap-4">
                  {summaryData.supervised.phases.map((phase, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-blue-700">{phase.phase}</CardTitle>
                          <Badge variant="outline">{phase.key}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1 text-sm">
                          {phase.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ML No Supervisado */}
          <TabsContent value="unsupervised" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-green-600" />
                  {summaryData.unsupervised.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Puntos Clave */}
                <div className="mb-6">
                  <h3 className="font-semibold text-green-700 mb-3">📋 Puntos Clave:</h3>
                  <div className="space-y-2">
                    {summaryData.unsupervised.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condiciones de uso */}
                <Card className="mb-6 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">¿Cuándo usar ML No Supervisado?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-2">
                      {summaryData.unsupervised.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Técnicas */}
                <div className="space-y-6">
                  {summaryData.unsupervised.techniques.map((technique, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-700">{technique.name}</CardTitle>
                        <p className="text-gray-600">{technique.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {technique.algorithms.map((algorithm, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{algorithm.name}</h4>
                                <Badge variant={algorithm.type === "Caja Blanca" ? "default" : "secondary"}>
                                  {algorithm.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{algorithm.characteristics}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-green-700">Uso típico:</span>
                                <span className="text-xs text-gray-600">{algorithm.use}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Métricas */}
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  {summaryData.metrics.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Puntos Clave */}
                <div className="mb-6">
                  <h3 className="font-semibold text-purple-700 mb-3">📋 Puntos Clave:</h3>
                  <div className="space-y-2">
                    {summaryData.metrics.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {summaryData.metrics.categories.map((category, index) => (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-700">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {category.metrics.map((metric, i) => (
                            <div key={i} className="bg-purple-50 p-4 rounded-lg">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-purple-800 mb-2">{metric.name}</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Fórmula:</span>
                                      <code className="ml-2 bg-white px-2 py-1 rounded text-xs">{metric.formula}</code>
                                    </div>
                                    <div>
                                      <span className="font-medium">Rango:</span>
                                      <span className="ml-2">{metric.range}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium text-purple-700">Interpretación:</span>
                                      <p className="text-gray-600 mt-1">{metric.interpretation}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-700">Uso:</span>
                                      <p className="text-gray-600 mt-1">{metric.use}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Referencia Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">ML Supervisado</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Datos etiquetados requeridos</li>
                  <li>• 10 fases sistemáticas</li>
                  <li>• Clasificación o regresión</li>
                  <li>• Evaluación con datos de prueba</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">ML No Supervisado</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Sin datos etiquetados</li>
                  <li>• Descubrimiento de patrones</li>
                  <li>• Clustering, reducción, reglas</li>
                  <li>• Evaluación más subjetiva</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Métricas Clave</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Silueta para clustering</li>
                  <li>• Varianza para reducción</li>
                  <li>• Soporte/Confianza/Lift</li>
                  <li>• Interpretación contextual</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
