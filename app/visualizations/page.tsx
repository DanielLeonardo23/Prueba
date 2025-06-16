"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, GitBranch, Layers, Network, Target, Brain } from "lucide-react"
import Link from "next/link"

export default function VisualizationsPage() {
  const [activeTab, setActiveTab] = useState("supervised")

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Visualizaciones ML</h1>
          <BarChart3 className="w-8 h-8 text-teal-600" />
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
            <TabsTrigger value="process" className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Procesos
            </TabsTrigger>
          </TabsList>

          {/* ML Supervisado */}
          <TabsContent value="supervised" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ciclo de Vida */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Ciclo de Vida ML Supervisado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex flex-col space-y-3">
                        {[
                          { phase: "1. Definición", color: "bg-red-500" },
                          { phase: "2. Recolección", color: "bg-orange-500" },
                          { phase: "3. Preparación", color: "bg-yellow-500" },
                          { phase: "4. División", color: "bg-green-500" },
                          { phase: "5. Selección", color: "bg-blue-500" },
                          { phase: "6. Entrenamiento", color: "bg-indigo-500" },
                          { phase: "7. Evaluación", color: "bg-purple-500" },
                          { phase: "8. Optimización", color: "bg-pink-500" },
                          { phase: "9. Implementación", color: "bg-gray-500" },
                          { phase: "10. Mantenimiento", color: "bg-teal-500" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                            <span className="text-sm font-medium">{item.phase}</span>
                            {index < 9 && <div className="absolute left-2 mt-6 w-0.5 h-4 bg-gray-300"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* División de Datos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-green-600" />
                    División de Datos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex">
                        <div className="bg-blue-500 flex-1 flex items-center justify-center text-white font-semibold">
                          Entrenamiento
                          <br />
                          70-80%
                        </div>
                        <div className="bg-green-500 w-1/4 flex items-center justify-center text-white font-semibold">
                          Prueba
                          <br />
                          20-30%
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>• Entrenamiento: Ajustar parámetros del modelo</p>
                      <p>• Prueba: Evaluar capacidad de generalización</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pipeline ML */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-purple-600" />
                    Pipeline de ML
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="bg-blue-100 p-3 rounded-lg text-center flex-1 mr-2">
                        <div className="text-sm font-semibold text-blue-800">Datos Raw</div>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="bg-green-100 p-3 rounded-lg text-center flex-1 mx-2">
                        <div className="text-sm font-semibold text-green-800">Preproceso</div>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div className="bg-purple-100 p-3 rounded-lg text-center flex-1 ml-2">
                        <div className="text-sm font-semibold text-purple-800">Modelo</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• StandardScaler() → Normalización</p>
                      <p>• RandomForestClassifier() → Clasificación</p>
                      <p>• Pipeline mantiene orden y reproducibilidad</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Validación Cruzada */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-orange-600" />
                    Validación Cruzada (5-Fold)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((fold) => (
                      <div key={fold} className="flex items-center gap-2">
                        <span className="text-xs font-medium w-12">Fold {fold}:</span>
                        <div className="flex flex-1 h-6 rounded overflow-hidden">
                          {[1, 2, 3, 4, 5].map((segment) => (
                            <div
                              key={segment}
                              className={`flex-1 ${
                                segment === fold ? "bg-red-400" : "bg-blue-400"
                              } border-r border-white last:border-r-0`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="text-xs text-gray-600 mt-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-400 rounded"></div>
                          <span>Entrenamiento</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-400 rounded"></div>
                          <span>Validación</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ML No Supervisado */}
          <TabsContent value="unsupervised" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Clustering K-Means */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-600" />
                    Clustering K-Means
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative h-48 bg-gray-50 rounded-lg p-4">
                      <svg viewBox="0 0 200 150" className="w-full h-full">
                        {/* Cluster 1 - Azul */}
                        <circle cx="50" cy="40" r="3" fill="#3B82F6" />
                        <circle cx="45" cy="35" r="2" fill="#3B82F6" />
                        <circle cx="55" cy="45" r="2" fill="#3B82F6" />
                        <circle cx="40" cy="50" r="2" fill="#3B82F6" />
                        <circle
                          cx="50"
                          cy="40"
                          r="8"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeDasharray="3,3"
                        />

                        {/* Cluster 2 - Verde */}
                        <circle cx="150" cy="50" r="3" fill="#10B981" />
                        <circle cx="145" cy="45" r="2" fill="#10B981" />
                        <circle cx="155" cy="55" r="2" fill="#10B981" />
                        <circle cx="140" cy="60" r="2" fill="#10B981" />
                        <circle
                          cx="150"
                          cy="50"
                          r="8"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeDasharray="3,3"
                        />

                        {/* Cluster 3 - Rojo */}
                        <circle cx="100" cy="110" r="3" fill="#EF4444" />
                        <circle cx="95" cy="105" r="2" fill="#EF4444" />
                        <circle cx="105" cy="115" r="2" fill="#EF4444" />
                        <circle cx="90" cy="120" r="2" fill="#EF4444" />
                        <circle
                          cx="100"
                          cy="110"
                          r="8"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="2"
                          strokeDasharray="3,3"
                        />

                        {/* Centroides */}
                        <circle cx="50" cy="40" r="4" fill="#1F2937" />
                        <circle cx="150" cy="50" r="4" fill="#1F2937" />
                        <circle cx="100" cy="110" r="4" fill="#1F2937" />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>• Puntos coloreados: datos agrupados</p>
                      <p>• Círculos punteados: límites de clusters</p>
                      <p>• Puntos negros: centroides</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PCA Reducción */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    PCA - Reducción de Dimensionalidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="bg-blue-100 p-4 rounded-lg mb-2">
                          <div className="text-sm font-semibold text-blue-800">Datos 3D</div>
                          <div className="text-xs text-blue-600">X, Y, Z</div>
                        </div>
                        <div className="text-xs text-gray-600">Alta dimensión</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="text-gray-400 text-2xl">→</div>
                        <div className="text-xs text-gray-600 mt-1">PCA</div>
                      </div>

                      <div className="text-center">
                        <div className="bg-green-100 p-4 rounded-lg mb-2">
                          <div className="text-sm font-semibold text-green-800">Datos 2D</div>
                          <div className="text-xs text-green-600">PC1, PC2</div>
                        </div>
                        <div className="text-xs text-gray-600">Baja dimensión</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded text-xs">
                      <div className="font-semibold mb-1">Varianza Explicada:</div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-16 h-2 bg-blue-500 rounded"></div>
                        <span>PC1: 65%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-2 bg-green-500 rounded"></div>
                        <span>PC2: 25%</span>
                      </div>
                      <div className="mt-1 text-gray-600">Total: 90% de información preservada</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Métricas de Clustering */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    Métricas de Clustering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Coeficiente de Silueta */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Coeficiente de Silueta</span>
                        <span className="text-sm text-green-600 font-semibold">0.75</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "87.5%" }}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Rango: [-1, 1] | Buena asignación</div>
                    </div>

                    {/* Índice Calinski-Harabasz */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Calinski-Harabasz</span>
                        <span className="text-sm text-blue-600 font-semibold">156.3</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Valores altos = mejor clustering</div>
                    </div>

                    {/* Davies-Bouldin */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Davies-Bouldin</span>
                        <span className="text-sm text-purple-600 font-semibold">0.42</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Valores bajos = mejor separación</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reglas de Asociación */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-teal-600" />
                    Reglas de Asociación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm font-semibold mb-2">Regla: Pan → Mantequilla</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium text-blue-600">Soporte</div>
                          <div>0.25</div>
                          <div className="text-gray-500">25% de transacciones</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">Confianza</div>
                          <div>0.80</div>
                          <div className="text-gray-500">80% probabilidad</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-purple-600">Lift</div>
                          <div>2.1</div>
                          <div className="text-gray-500">2.1x más probable</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600">
                      <p>• Soporte: Frecuencia del conjunto</p>
                      <p>• Confianza: P(Mantequilla &gt; Pan)</p>
                      <p>• Lift &gt; 1: Asociación positiva</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Procesos */}
          <TabsContent value="process" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              {/* Comparación Supervisado vs No Supervisado */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-indigo-600" />
                    Comparación: Supervisado vs No Supervisado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Machine Learning Supervisado
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="font-medium text-blue-800 mb-1">Datos</div>
                          <div className="text-sm text-blue-700">Etiquetados (X, y)</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="font-medium text-blue-800 mb-1">Objetivo</div>
                          <div className="text-sm text-blue-700">Predecir/Clasificar</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="font-medium text-blue-800 mb-1">Evaluación</div>
                          <div className="text-sm text-blue-700">Métricas objetivas</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="font-medium text-blue-800 mb-1">Ejemplos</div>
                          <div className="text-sm text-blue-700">Regresión, Clasificación</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-green-700 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Machine Learning No Supervisado
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded">
                          <div className="font-medium text-green-800 mb-1">Datos</div>
                          <div className="text-sm text-green-700">Sin etiquetas (solo X)</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="font-medium text-green-800 mb-1">Objetivo</div>
                          <div className="text-sm text-green-700">Descubrir patrones</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="font-medium text-green-800 mb-1">Evaluación</div>
                          <div className="text-sm text-green-700">Métricas específicas</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="font-medium text-green-800 mb-1">Ejemplos</div>
                          <div className="text-sm text-green-700">Clustering, PCA, Reglas</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flujo de Decisión */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-purple-600" />
                    Flujo de Decisión: ¿Qué Técnica Usar?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Inicio */}
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <div className="font-semibold">¿Tienes datos etiquetados?</div>
                      </div>

                      {/* Bifurcación */}
                      <div className="flex items-center justify-center space-x-8">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-sm font-medium text-green-600">SÍ</div>
                          <div className="w-0.5 h-8 bg-green-400"></div>
                          <div className="bg-blue-100 p-3 rounded text-center">
                            <div className="font-semibold text-blue-800">ML Supervisado</div>
                            <div className="text-xs text-blue-600 mt-1">
                              Clasificación
                              <br />
                              Regresión
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-sm font-medium text-red-600">NO</div>
                          <div className="w-0.5 h-8 bg-red-400"></div>
                          <div className="bg-green-100 p-3 rounded text-center">
                            <div className="font-semibold text-green-800">ML No Supervisado</div>
                            <div className="text-xs text-green-600 mt-1">
                              Clustering
                              <br />
                              Reducción
                              <br />
                              Reglas
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preguntas adicionales */}
                      <div className="grid md:grid-cols-2 gap-4 w-full mt-6">
                        <div className="bg-blue-50 p-4 rounded">
                          <div className="font-semibold text-blue-800 mb-2">Si es Supervisado:</div>
                          <div className="text-sm space-y-1">
                            <p>• ¿Salida numérica? → Regresión</p>
                            <p>• ¿Salida categórica? → Clasificación</p>
                            <p>• ¿Necesitas interpretabilidad? → Caja Blanca</p>
                            <p>• ¿Tienes muchos datos? → Deep Learning</p>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded">
                          <div className="font-semibold text-green-800 mb-2">Si es No Supervisado:</div>
                          <div className="text-sm space-y-1">
                            <p>• ¿Agrupar similares? → Clustering</p>
                            <p>• ¿Reducir dimensiones? → PCA/t-SNE</p>
                            <p>• ¿Encontrar reglas? → Apriori</p>
                            <p>• ¿Detectar anomalías? → DBSCAN</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
