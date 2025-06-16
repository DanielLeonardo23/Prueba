"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Shuffle } from "lucide-react"
import Link from "next/link"

const flashcardsData = [
  {
    id: 1,
    category: "ML Supervisado",
    front: "¿Cuáles son las 10 fases del ciclo de vida de ML supervisado?",
    back: "1. Definición del problema\n2. Recolección de datos\n3. Preparación de datos\n4. División del conjunto\n5. Selección del modelo\n6. Entrenamiento\n7. Evaluación\n8. Optimización de hiperparámetros\n9. Implementación\n10. Mantenimiento",
  },
  {
    id: 2,
    category: "ML Supervisado",
    front: "¿Qué es un Pipeline en Machine Learning?",
    back: "Una secuencia estructurada de pasos donde cada paso realiza una transformación específica sobre los datos (limpieza, codificación, escalado, modelado). Permite ejecutar todo el flujo de forma consistente y reproducible.",
  },
  {
    id: 3,
    category: "ML Supervisado",
    front: "¿Cuál es la diferencia entre parámetros e hiperparámetros?",
    back: "Parámetros: se aprenden automáticamente durante el entrenamiento (ej: pesos en redes neuronales).\nHiperparámetros: se configuran antes del entrenamiento y no se aprenden automáticamente (ej: learning rate, número de árboles).",
  },
  {
    id: 4,
    category: "ML No Supervisado",
    front: "¿Cuáles son las 3 principales técnicas de ML no supervisado?",
    back: "1. Clustering (agrupamiento): K-Means, DBSCAN, Clustering Jerárquico\n2. Reducción de dimensionalidad: PCA, t-SNE, UMAP\n3. Reglas de asociación: Algoritmo Apriori",
  },
  {
    id: 5,
    category: "ML No Supervisado",
    front: "¿Cuándo usar ML no supervisado?",
    back: "- Datos sin etiquetar\n- Exploración o descubrimiento de patrones\n- Necesidad de reducir complejidad\n- Segmentación de clientes\n- Detección de anomalías",
  },
  {
    id: 6,
    category: "Métricas",
    front: "¿Qué mide el Coeficiente de Silueta en clustering?",
    back: "Mide qué tan bien está asignado cada punto a su cluster. Valores cercanos a 1 indican buena asignación, valores cercanos a -1 indican mala asignación. Rango: [-1, 1]",
  },
  {
    id: 7,
    category: "ML Supervisado",
    front: "¿Qué es SMOTE y cuándo se usa?",
    back: "SMOTE (Synthetic Minority Oversampling Technique) es una técnica de balanceo que aumenta la clase minoritaria con registros sintéticos. Se usa cuando hay desbalance de clases en problemas de clasificación.",
  },
  {
    id: 8,
    category: "ML Supervisado",
    front: "¿Cuál es la diferencia entre Grid Search y Random Search?",
    back: "Grid Search: prueba todas las combinaciones posibles de hiperparámetros definidos.\nRandom Search: prueba combinaciones aleatorias de hiperparámetros. Es más eficiente cuando hay muchos hiperparámetros.",
  },
  {
    id: 9,
    category: "ML No Supervisado",
    front: "¿Qué diferencia hay entre algoritmos de caja blanca y caja negra?",
    back: "Caja Blanca: interpretables, se puede entender cómo toman decisiones (ej: K-Means, PCA).\nCaja Negra: no interpretables, difícil entender el proceso interno (ej: Autoencoders, GANs).",
  },
  {
    id: 10,
    category: "Métricas",
    front: "¿Qué miden Soporte, Confianza y Lift en reglas de asociación?",
    back: "Soporte: frecuencia del conjunto de elementos.\nConfianza: probabilidad condicional de que ocurra B dado A.\nLift: cuánto más probable es B cuando ocurre A, comparado con la probabilidad base de B.",
  },
]

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownCards, setKnownCards] = useState<number[]>([])
  const [unknownCards, setUnknownCards] = useState<number[]>([])
  const [cards, setCards] = useState(flashcardsData)
  const [studyMode, setStudyMode] = useState<"all" | "unknown">("all")

  const currentCardData = cards[currentCard]
  const progress = ((currentCard + 1) / cards.length) * 100

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKnown = () => {
    if (!knownCards.includes(currentCardData.id)) {
      setKnownCards([...knownCards, currentCardData.id])
    }
    nextCard()
  }

  const handleUnknown = () => {
    if (!unknownCards.includes(currentCardData.id)) {
      setUnknownCards([...unknownCards, currentCardData.id])
    }
    nextCard()
  }

  const nextCard = () => {
    setIsFlipped(false)
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
    } else {
      // Reiniciar o mostrar resumen
      setCurrentCard(0)
    }
  }

  const prevCard = () => {
    setIsFlipped(false)
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
    }
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCurrentCard(0)
    setIsFlipped(false)
  }

  const resetProgress = () => {
    setKnownCards([])
    setUnknownCards([])
    setCurrentCard(0)
    setIsFlipped(false)
  }

  const studyUnknownOnly = () => {
    if (unknownCards.length > 0) {
      const unknownCardsData = flashcardsData.filter((card) => unknownCards.includes(card.id))
      setCards(unknownCardsData)
      setCurrentCard(0)
      setIsFlipped(false)
      setStudyMode("unknown")
    }
  }

  const studyAllCards = () => {
    setCards(flashcardsData)
    setCurrentCard(0)
    setIsFlipped(false)
    setStudyMode("all")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Flashcards ML</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={shuffleCards} variant="outline" size="sm">
              <Shuffle className="w-4 h-4 mr-2" />
              Mezclar
            </Button>
            <Button onClick={resetProgress} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Tarjeta {currentCard + 1} de {cards.length}
              </span>
              <span className="text-sm text-gray-500">
                Conocidas: {knownCards.length} | Desconocidas: {unknownCards.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Study Mode Selector */}
        <div className="flex gap-2 mb-6">
          <Button onClick={studyAllCards} variant={studyMode === "all" ? "default" : "outline"} size="sm">
            Todas las tarjetas ({flashcardsData.length})
          </Button>
          <Button
            onClick={studyUnknownOnly}
            variant={studyMode === "unknown" ? "default" : "outline"}
            size="sm"
            disabled={unknownCards.length === 0}
          >
            Solo desconocidas ({unknownCards.length})
          </Button>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-2xl h-96 cursor-pointer" onClick={handleFlip}>
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
              {/* Front */}
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">{currentCardData.category}</span>
                    <span className="text-sm">Pregunta</span>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                  <p className="text-xl text-center font-medium leading-relaxed">{currentCardData.front}</p>
                </CardContent>
              </Card>

              {/* Back */}
              <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-green-500 to-teal-600 text-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-white/20 px-2 py-1 rounded">{currentCardData.category}</span>
                    <span className="text-sm">Respuesta</span>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                  <p className="text-lg text-center leading-relaxed whitespace-pre-line">{currentCardData.back}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <Button onClick={prevCard} variant="outline" disabled={currentCard === 0}>
            Anterior
          </Button>
          <Button onClick={handleFlip} variant="outline">
            {isFlipped ? "Ver Pregunta" : "Ver Respuesta"}
          </Button>
          <Button onClick={nextCard} variant="outline" disabled={currentCard === cards.length - 1}>
            Siguiente
          </Button>
        </div>

        {/* Knowledge Assessment */}
        {isFlipped && (
          <div className="flex justify-center gap-4">
            <Button onClick={handleKnown} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Lo sé bien
            </Button>
            <Button onClick={handleUnknown} className="bg-red-600 hover:bg-red-700">
              <XCircle className="w-4 h-4 mr-2" />
              Necesito repasar
            </Button>
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Cómo usar las Flashcards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Haz clic en la tarjeta para voltearla y ver la respuesta</li>
              <li>• Marca si conoces bien el concepto o necesitas repasarlo</li>
              <li>• Usa "Solo desconocidas" para enfocarte en lo que necesitas aprender</li>
              <li>• Mezcla las tarjetas para variar el orden de estudio</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
