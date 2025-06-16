"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy, Shuffle } from "lucide-react"
import Link from "next/link"

// Banco de preguntas expandido - 150 preguntas total (50 por PDF)
const allQuestions = [
  // ==================== ML SUPERVISADO (50 preguntas) ====================

  // Preguntas de Opción Múltiple (25)
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
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué porcentaje de datos se recomienda típicamente para entrenamiento?",
    options: ["50-60%", "60-70%", "70-80%", "80-90%"],
    correct: 2,
    explanation: "Se recomienda usar 70-80% de los datos para entrenamiento y 20-30% para prueba.",
  },
  {
    id: 3,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es el propósito principal de un Pipeline en ML?",
    options: [
      "Acelerar el entrenamiento",
      "Reducir el tamaño de los datos",
      "Mantener reproducibilidad y orden de pasos",
      "Aumentar la precisión del modelo",
    ],
    correct: 2,
    explanation:
      "Los pipelines mantienen el orden lógico y seguro de los pasos, reducen errores y facilitan la reproducibilidad.",
  },
  {
    id: 4,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué técnica se usa para balancear clases desbalanceadas?",
    options: ["PCA", "SMOTE", "Grid Search", "Cross Validation"],
    correct: 1,
    explanation:
      "SMOTE (Synthetic Minority Oversampling Technique) aumenta la clase minoritaria con registros sintéticos.",
  },
  {
    id: 5,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es la diferencia principal entre Grid Search y Random Search?",
    options: [
      "Grid Search es más rápido",
      "Random Search es más preciso",
      "Grid Search prueba todas las combinaciones, Random Search prueba aleatorias",
      "No hay diferencia",
    ],
    correct: 2,
    explanation:
      "Grid Search prueba exhaustivamente todas las combinaciones definidas, mientras que Random Search prueba combinaciones aleatorias.",
  },
  {
    id: 6,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿En qué fase se serializa el modelo?",
    options: ["Entrenamiento", "Evaluación", "Optimización", "Implementación"],
    correct: 3,
    explanation:
      "La serialización del modelo ocurre en la fase de implementación para guardarlo en formato portable (.pkl, .joblib).",
  },
  {
    id: 7,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué significa MLOps?",
    options: [
      "Machine Learning Operations",
      "Multiple Learning Options",
      "Model Learning Optimization",
      "Machine Logic Operations",
    ],
    correct: 0,
    explanation:
      "MLOps integra prácticas de DevOps en el ciclo de vida de ML, desde desarrollo hasta mantenimiento de modelos en producción.",
  },
  {
    id: 8,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es el objetivo de la validación cruzada?",
    options: [
      "Acelerar el entrenamiento",
      "Reducir overfitting",
      "Estimar rendimiento de forma robusta",
      "Aumentar el tamaño del dataset",
    ],
    correct: 2,
    explanation:
      "La validación cruzada proporciona una estimación más robusta del rendimiento durante la optimización de hiperparámetros.",
  },
  {
    id: 9,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué se debe hacer con outliers que son errores?",
    options: ["Mantenerlos", "Corregirlos", "Eliminarlos", "Duplicarlos"],
    correct: 1,
    explanation:
      "Los outliers que son errores deben corregirse si es posible, eliminar solo si es anómalo e injustificado.",
  },
  {
    id: 10,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es la función de train_test_split?",
    options: [
      "Entrenar el modelo",
      "Dividir datos en entrenamiento y prueba",
      "Evaluar el modelo",
      "Optimizar hiperparámetros",
    ],
    correct: 1,
    explanation: "train_test_split divide el dataset en conjuntos de entrenamiento y prueba de forma aleatoria.",
  },
  {
    id: 11,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué parámetro asegura reproducibilidad en train_test_split?",
    options: ["test_size", "stratify", "random_state", "shuffle"],
    correct: 2,
    explanation: "random_state fija la semilla aleatoria para obtener siempre la misma división.",
  },
  {
    id: 12,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es el propósito de la fase de mantenimiento?",
    options: [
      "Entrenar nuevos modelos",
      "Recolectar más datos",
      "Monitorear y actualizar el modelo en producción",
      "Evaluar métricas",
    ],
    correct: 2,
    explanation:
      "El mantenimiento incluye monitoreo continuo, detección de drift y reentrenamiento cuando es necesario.",
  },
  {
    id: 13,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué es el data drift?",
    options: ["Cambios en los datos de entrada", "Errores en el modelo", "Pérdida de datos", "Aumento del dataset"],
    correct: 0,
    explanation:
      "Data drift ocurre cuando la distribución de los datos de entrada cambia con respecto al entrenamiento.",
  },
  {
    id: 14,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es la ventaja principal de usar pipelines?",
    options: [
      "Mayor velocidad",
      "Menor uso de memoria",
      "Evitar errores manuales y mantener consistencia",
      "Mejor precisión",
    ],
    correct: 2,
    explanation: "Los pipelines automatizan el flujo de trabajo y reducen errores humanos en el proceso.",
  },
  {
    id: 15,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué significa 'concept drift'?",
    options: [
      "Cambio en la distribución de datos",
      "Cambio en la relación entre variables y target",
      "Error en el modelo",
      "Pérdida de precisión",
    ],
    correct: 1,
    explanation:
      "Concept drift ocurre cuando la relación entre las variables de entrada y la variable objetivo cambia.",
  },
  {
    id: 16,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es el objetivo del reentrenamiento?",
    options: [
      "Crear un nuevo modelo",
      "Mantener o mejorar rendimiento ante cambios",
      "Reducir el tamaño del modelo",
      "Acelerar las predicciones",
    ],
    correct: 1,
    explanation: "El reentrenamiento adapta el modelo a nuevos patrones en los datos para mantener su efectividad.",
  },
  {
    id: 17,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué es shadow deployment?",
    options: [
      "Entrenar en paralelo",
      "Validar en producción sin afectar sistema activo",
      "Crear copias del modelo",
      "Ocultar el modelo",
    ],
    correct: 1,
    explanation:
      "Shadow deployment permite probar un nuevo modelo en producción sin afectar las decisiones del sistema actual.",
  },
  {
    id: 18,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es la diferencia entre parámetros e hiperparámetros?",
    options: [
      "No hay diferencia",
      "Parámetros se aprenden automáticamente, hiperparámetros se configuran",
      "Hiperparámetros se aprenden automáticamente, parámetros se configuran",
      "Ambos se configuran manualmente",
    ],
    correct: 1,
    explanation:
      "Los parámetros se aprenden durante el entrenamiento, los hiperparámetros se configuran antes del entrenamiento.",
  },
  {
    id: 19,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué formato se recomienda para serializar modelos?",
    options: [".txt", ".csv", ".pkl o .joblib", ".json"],
    correct: 2,
    explanation: "Los formatos .pkl (pickle) y .joblib son estándar para serializar modelos de scikit-learn.",
  },
  {
    id: 20,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuál es el propósito de A/B testing en ML?",
    options: [
      "Entrenar dos modelos",
      "Comparar rendimiento de modelos en producción",
      "Dividir los datos",
      "Acelerar el entrenamiento",
    ],
    correct: 1,
    explanation: "A/B testing permite comparar el rendimiento de diferentes modelos con usuarios reales en producción.",
  },
  {
    id: 21,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué significa 'feature engineering'?",
    options: [
      "Crear nuevas características a partir de datos existentes",
      "Eliminar características",
      "Normalizar datos",
      "Dividir el dataset",
    ],
    correct: 0,
    explanation:
      "Feature engineering es el proceso de crear, transformar y seleccionar características para mejorar el modelo.",
  },
  {
    id: 22,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Cuándo usar Label Encoding vs One-Hot Encoding?",
    options: [
      "Siempre usar Label Encoding",
      "Label para ordinales, One-Hot para nominales",
      "Siempre usar One-Hot",
      "No hay diferencia",
    ],
    correct: 1,
    explanation:
      "Label Encoding preserva orden (variables ordinales), One-Hot Encoding no asume orden (variables nominales).",
  },
  {
    id: 23,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué es el overfitting?",
    options: [
      "Modelo muy simple",
      "Modelo que memoriza datos de entrenamiento",
      "Modelo muy rápido",
      "Modelo muy pequeño",
    ],
    correct: 1,
    explanation:
      "Overfitting ocurre cuando el modelo memoriza los datos de entrenamiento pero no generaliza bien a datos nuevos.",
  },
  {
    id: 24,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué es el underfitting?",
    options: [
      "Modelo muy complejo",
      "Modelo que no captura patrones importantes",
      "Modelo muy lento",
      "Modelo muy grande",
    ],
    correct: 1,
    explanation:
      "Underfitting ocurre cuando el modelo es demasiado simple para capturar los patrones subyacentes en los datos.",
  },
  {
    id: 25,
    type: "multiple",
    category: "ML Supervisado",
    question: "¿Qué técnica ayuda a prevenir overfitting?",
    options: ["Aumentar complejidad", "Regularización", "Más features", "Menos datos"],
    correct: 1,
    explanation: "La regularización (L1, L2) penaliza la complejidad del modelo para prevenir overfitting.",
  },

  // Preguntas Verdadero/Falso ML Supervisado (25)
  {
    id: 26,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Es recomendable usar el conjunto de prueba durante el entrenamiento del modelo?",
    correct: false,
    explanation:
      "No, el conjunto de prueba debe mantenerse separado para evaluar la capacidad de generalización del modelo con datos no vistos.",
  },
  {
    id: 27,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿SMOTE es una técnica para balancear clases desbalanceadas?",
    correct: true,
    explanation:
      "SMOTE (Synthetic Minority Oversampling Technique) aumenta la clase minoritaria con registros sintéticos.",
  },
  {
    id: 28,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿La validación cruzada se debe usar siempre que se realice tuning de hiperparámetros?",
    correct: true,
    explanation:
      "La validación cruzada proporciona una estimación más robusta del rendimiento durante la optimización de hiperparámetros.",
  },
  {
    id: 29,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Los outliers siempre deben eliminarse de los datos?",
    correct: false,
    explanation:
      "Los outliers se deben corregir si es error, eliminar si es anómalo e injustificado, mantener si es relevante.",
  },
  {
    id: 30,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Los pipelines solo sirven para acelerar el entrenamiento?",
    correct: false,
    explanation: "Su propósito principal es mantener reproducibilidad y orden, no acelerar el entrenamiento.",
  },
  {
    id: 31,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿El conjunto de entrenamiento debe ser menor que el de prueba?",
    correct: false,
    explanation: "Se recomienda 70-80% para entrenamiento, 20-30% para prueba.",
  },
  {
    id: 32,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿La fase de mantenimiento es opcional en proyectos de ML?",
    correct: false,
    explanation: "Es fundamental para mantener el modelo funcionando correctamente en producción.",
  },
  {
    id: 33,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿La serialización del modelo ocurre en la fase de implementación?",
    correct: true,
    explanation: "Se guarda en formato portable para reutilización durante la implementación.",
  },
  {
    id: 34,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Random Search es siempre mejor que Grid Search?",
    correct: false,
    explanation: "Grid Search es exhaustivo, Random Search es más eficiente con muchos hiperparámetros.",
  },
  {
    id: 35,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿El data drift afecta el rendimiento del modelo en producción?",
    correct: true,
    explanation: "Cuando los datos cambian, el modelo puede perder efectividad y necesitar reentrenamiento.",
  },
  {
    id: 36,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Feature engineering puede mejorar significativamente el rendimiento del modelo?",
    correct: true,
    explanation: "Crear características relevantes es crucial para el éxito de los modelos de ML.",
  },
  {
    id: 37,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿El overfitting es siempre malo?",
    correct: true,
    explanation: "El overfitting reduce la capacidad de generalización del modelo a datos nuevos.",
  },
  {
    id: 38,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿La regularización ayuda a prevenir overfitting?",
    correct: true,
    explanation: "La regularización penaliza la complejidad del modelo para mejorar la generalización.",
  },
  {
    id: 39,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Más datos siempre mejoran el rendimiento del modelo?",
    correct: false,
    explanation: "Datos de mala calidad o irrelevantes pueden empeorar el rendimiento.",
  },
  {
    id: 40,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿El stratify en train_test_split mantiene la proporción de clases?",
    correct: true,
    explanation: "Stratify asegura que ambos conjuntos mantengan la misma distribución de clases.",
  },
  {
    id: 41,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Cross-validation k-fold divide los datos en k partes iguales?",
    correct: true,
    explanation: "K-fold divide el dataset en k subconjuntos de tamaño similar para validación.",
  },
  {
    id: 42,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿El concept drift requiere reentrenamiento del modelo?",
    correct: true,
    explanation: "Cuando cambia la relación entre variables y target, el modelo necesita actualizarse.",
  },
  {
    id: 43,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Shadow deployment permite probar modelos sin riesgo?",
    correct: true,
    explanation: "Ejecuta el nuevo modelo en paralelo sin afectar las decisiones del sistema actual.",
  },
  {
    id: 44,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿One-Hot Encoding siempre es mejor que Label Encoding?",
    correct: false,
    explanation: "Depende del tipo de variable: One-Hot para nominales, Label para ordinales.",
  },
  {
    id: 45,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿La normalización de datos es siempre necesaria?",
    correct: false,
    explanation: "Depende del algoritmo: necesaria para SVM/KNN, no para árboles de decisión.",
  },
  {
    id: 46,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿El modelo más complejo siempre es mejor?",
    correct: false,
    explanation: "Modelos muy complejos pueden sufrir overfitting y ser difíciles de interpretar.",
  },
  {
    id: 47,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿MLOps es importante para proyectos de ML en producción?",
    correct: true,
    explanation: "MLOps facilita el despliegue, monitoreo y mantenimiento de modelos en producción.",
  },
  {
    id: 48,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿La evaluación del modelo debe hacerse solo al final del proyecto?",
    correct: false,
    explanation: "La evaluación debe ser continua durante todo el ciclo de vida del modelo.",
  },
  {
    id: 49,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿Los hiperparámetros se aprenden automáticamente durante el entrenamiento?",
    correct: false,
    explanation: "Los hiperparámetros se configuran antes del entrenamiento, los parámetros se aprenden.",
  },
  {
    id: 50,
    type: "boolean",
    category: "ML Supervisado",
    question: "¿A/B testing es útil para comparar modelos en producción?",
    correct: true,
    explanation: "Permite evaluar el impacto real de diferentes modelos con usuarios reales.",
  },

  // ==================== ML NO SUPERVISADO (50 preguntas) ====================

  // Preguntas de Opción Múltiple (25)
  {
    id: 51,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuáles son las 3 principales técnicas de ML no supervisado?",
    options: [
      "Clasificación, Regresión, Clustering",
      "Clustering, Reducción de dimensionalidad, Reglas de asociación",
      "PCA, SVM, Random Forest",
      "Supervisado, Semi-supervisado, Reforzado",
    ],
    correct: 1,
    explanation:
      "Las tres técnicas principales son: Clustering (agrupamiento), Reducción de dimensionalidad y Reglas de asociación.",
  },
  {
    id: 52,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál NO es una condición para usar ML no supervisado?",
    options: [
      "Datos sin etiquetar",
      "Exploración de patrones",
      "Datos etiquetados disponibles",
      "Necesidad de reducir complejidad",
    ],
    correct: 2,
    explanation: "El ML no supervisado trabaja específicamente con datos sin etiquetas.",
  },
  {
    id: 53,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué algoritmo es mejor para detectar clusters de forma arbitraria?",
    options: ["K-Means", "DBSCAN", "PCA", "Apriori"],
    correct: 1,
    explanation:
      "DBSCAN puede encontrar clusters de forma arbitraria y detectar outliers, a diferencia de K-Means que asume clusters esféricos.",
  },
  {
    id: 54,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es la característica principal de K-Means?",
    options: [
      "Detecta outliers",
      "Divide en k clusters con centroides",
      "Reduce dimensionalidad",
      "Encuentra reglas de asociación",
    ],
    correct: 1,
    explanation: "K-Means divide los datos en k clusters y actualiza iterativamente los centroides.",
  },
  {
    id: 55,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué hace PCA principalmente?",
    options: [
      "Agrupa datos similares",
      "Detecta anomalías",
      "Reduce dimensiones manteniendo varianza",
      "Encuentra reglas",
    ],
    correct: 2,
    explanation:
      "PCA transforma los datos en componentes principales que capturan la máxima varianza, reduciendo dimensionalidad.",
  },
  {
    id: 56,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es la diferencia entre t-SNE y PCA?",
    options: [
      "No hay diferencia",
      "t-SNE es lineal, PCA no lineal",
      "PCA es lineal, t-SNE no lineal",
      "Ambos son no lineales",
    ],
    correct: 2,
    explanation:
      "PCA es una técnica lineal, mientras que t-SNE es no lineal y preserva mejor las relaciones locales para visualización.",
  },
  {
    id: 57,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué algoritmo se usa para reglas de asociación?",
    options: ["K-Means", "DBSCAN", "Apriori", "PCA"],
    correct: 2,
    explanation: "El algoritmo Apriori encuentra conjuntos de elementos frecuentes y genera reglas de asociación.",
  },
  {
    id: 58,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿K-Means es un algoritmo de caja blanca o negra?",
    options: ["Caja negra", "Caja blanca", "Depende de los datos", "No se puede clasificar"],
    correct: 1,
    explanation: "K-Means es de caja blanca porque es interpretable y se puede entender cómo agrupa los datos.",
  },
  {
    id: 59,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es el uso típico de DBSCAN?",
    options: [
      "Segmentación de clientes",
      "Detección de anomalías y clusters arbitrarios",
      "Visualización 2D",
      "Market basket analysis",
    ],
    correct: 1,
    explanation: "DBSCAN es excelente para detectar anomalías y encontrar clusters de forma arbitraria.",
  },
  {
    id: 60,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué son los GANs?",
    options: [
      "Algoritmo de clustering",
      "Técnica de reducción",
      "Redes generativas adversarias",
      "Método de asociación",
    ],
    correct: 2,
    explanation: "GANs (Generative Adversarial Networks) son redes neuronales que generan datos sintéticos.",
  },
  {
    id: 61,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿UMAP es una técnica de qué tipo?",
    options: ["Clustering", "Reducción de dimensionalidad", "Reglas de asociación", "Clasificación"],
    correct: 1,
    explanation: "UMAP (Uniform Manifold Approximation and Projection) es una técnica de reducción de dimensionalidad.",
  },
  {
    id: 62,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es la ventaja de los Autoencoders?",
    options: ["Son interpretables", "Aprenden representaciones comprimidas", "Son muy rápidos", "No necesitan datos"],
    correct: 1,
    explanation: "Los Autoencoders aprenden representaciones comprimidas de los datos de entrada.",
  },
  {
    id: 63,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué preserva t-SNE principalmente?",
    options: ["Varianza global", "Relaciones lineales", "Relaciones locales", "Todas las distancias"],
    correct: 2,
    explanation: "t-SNE se enfoca en preservar las relaciones locales entre puntos cercanos.",
  },
  {
    id: 64,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Los mapas autoorganizados (SOM) son de qué tipo?",
    options: ["Caja blanca", "Caja negra", "Híbrido", "No clasificable"],
    correct: 1,
    explanation: "Los SOM son redes neuronales, por tanto son algoritmos de caja negra.",
  },
  {
    id: 65,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es el objetivo principal del clustering jerárquico?",
    options: ["Encontrar k clusters", "Crear jerarquía de agrupaciones", "Reducir dimensiones", "Detectar outliers"],
    correct: 1,
    explanation: "El clustering jerárquico crea una jerarquía de clusters que puede visualizarse como dendrograma.",
  },
  {
    id: 66,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué tipo de datos requiere el ML no supervisado?",
    options: [
      "Solo datos etiquetados",
      "Solo características de entrada (X)",
      "Datos etiquetados y no etiquetados",
      "Solo datos de salida (y)",
    ],
    correct: 1,
    explanation: "El ML no supervisado trabaja únicamente con características de entrada, sin etiquetas.",
  },
  {
    id: 67,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es una aplicación típica de las reglas de asociación?",
    options: [
      "Segmentación de clientes",
      "Reducción de dimensionalidad",
      "Market basket analysis",
      "Detección de anomalías",
    ],
    correct: 2,
    explanation:
      "Las reglas de asociación se usan típicamente en market basket analysis para encontrar productos que se compran juntos.",
  },
  {
    id: 68,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué algoritmo NO es de caja blanca?",
    options: ["K-Means", "PCA", "Apriori", "Autoencoders"],
    correct: 3,
    explanation: "Los Autoencoders son redes neuronales, por tanto son algoritmos de caja negra.",
  },
  {
    id: 69,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿DBSCAN requiere especificar el número de clusters?",
    options: ["Sí, siempre", "No, los encuentra automáticamente", "Solo a veces", "Depende de los datos"],
    correct: 1,
    explanation: "DBSCAN encuentra automáticamente el número de clusters basándose en la densidad de los datos.",
  },
  {
    id: 70,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es la principal ventaja de usar algoritmos de caja blanca?",
    options: ["Mayor precisión", "Menor tiempo de cómputo", "Interpretabilidad", "Menos datos requeridos"],
    correct: 2,
    explanation:
      "Los algoritmos de caja blanca permiten entender cómo toman decisiones, facilitando la interpretación.",
  },
  {
    id: 71,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué significa que un algoritmo sea 'no paramétrico'?",
    options: ["No tiene parámetros", "No asume distribución específica de datos", "Es muy rápido", "Es interpretable"],
    correct: 1,
    explanation: "Los algoritmos no paramétricos no asumen una distribución específica de los datos.",
  },
  {
    id: 72,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Los GANs se usan principalmente para?",
    options: ["Clustering", "Reducción de dimensionalidad", "Generación de datos sintéticos", "Reglas de asociación"],
    correct: 2,
    explanation: "Los GANs se especializan en generar datos sintéticos que parecen reales.",
  },
  {
    id: 73,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es el parámetro más importante en K-Means?",
    options: ["Número de iteraciones", "Número de clusters (k)", "Distancia mínima", "Tamaño del dataset"],
    correct: 1,
    explanation: "El número de clusters (k) es el parámetro fundamental que debe especificarse en K-Means.",
  },
  {
    id: 74,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Qué método se usa para determinar el k óptimo en K-Means?",
    options: ["Método del codo", "Validación cruzada", "Grid search", "Random search"],
    correct: 0,
    explanation: "El método del codo analiza la inercia vs número de clusters para encontrar el k óptimo.",
  },
  {
    id: 75,
    type: "multiple",
    category: "ML No Supervisado",
    question: "¿Cuál es la diferencia principal entre clustering aglomerativo y divisivo?",
    options: [
      "No hay diferencia",
      "Aglomerativo une clusters, divisivo los separa",
      "Aglomerativo es más rápido",
      "Divisivo es más preciso",
    ],
    correct: 1,
    explanation:
      "El clustering aglomerativo comienza con puntos individuales y los une; el divisivo comienza con un cluster y lo divide.",
  },

  // Preguntas Verdadero/Falso ML No Supervisado (25)
  {
    id: 76,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿K-Means es un algoritmo de caja negra?",
    correct: false,
    explanation: "K-Means es de caja blanca porque es interpretable y se puede entender cómo agrupa los datos.",
  },
  {
    id: 77,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿El ML no supervisado requiere datos etiquetados?",
    correct: false,
    explanation: "El ML no supervisado trabaja únicamente con características de entrada, sin etiquetas.",
  },
  {
    id: 78,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿DBSCAN puede encontrar clusters de forma arbitraria?",
    correct: true,
    explanation:
      "DBSCAN puede detectar clusters de cualquier forma, a diferencia de K-Means que asume clusters esféricos.",
  },
  {
    id: 79,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿PCA siempre preserva el 100% de la información?",
    correct: false,
    explanation:
      "PCA reduce dimensionalidad con pérdida controlada de información, preservando la máxima varianza posible.",
  },
  {
    id: 80,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿t-SNE es mejor que PCA para visualización?",
    correct: true,
    explanation:
      "t-SNE preserva mejor las relaciones locales, siendo más efectivo para visualización de datos complejos.",
  },
  {
    id: 81,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Los Autoencoders son algoritmos de caja blanca?",
    correct: false,
    explanation:
      "Los Autoencoders son redes neuronales, por tanto son algoritmos de caja negra con baja interpretabilidad.",
  },
  {
    id: 82,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿El algoritmo Apriori se usa para clustering?",
    correct: false,
    explanation: "Apriori se usa para encontrar reglas de asociación, no para clustering.",
  },
  {
    id: 83,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿UMAP puede usarse tanto para reducción como visualización?",
    correct: true,
    explanation: "UMAP es versátil y efectivo tanto para reducción de dimensionalidad como para visualización.",
  },
  {
    id: 84,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Los GANs requieren datos etiquetados para funcionar?",
    correct: false,
    explanation: "Los GANs son técnicas no supervisadas que aprenden a generar datos sin necesidad de etiquetas.",
  },
  {
    id: 85,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿El clustering jerárquico siempre produce el mismo número de clusters que K-Means?",
    correct: false,
    explanation:
      "El clustering jerárquico produce una jerarquía que puede cortarse en diferentes niveles para obtener distintos números de clusters.",
  },
  {
    id: 86,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿DBSCAN puede detectar outliers automáticamente?",
    correct: true,
    explanation: "DBSCAN marca como ruido (outliers) los puntos que no pertenecen a ningún cluster denso.",
  },
  {
    id: 87,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿K-Means garantiza encontrar la solución óptima global?",
    correct: false,
    explanation: "K-Means puede converger a mínimos locales, por eso se recomienda ejecutarlo múltiples veces.",
  },
  {
    id: 88,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿PCA es una técnica lineal?",
    correct: true,
    explanation: "PCA es una transformación lineal que proyecta los datos en un espacio de menor dimensión.",
  },
  {
    id: 89,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Los algoritmos de caja blanca son siempre mejores que los de caja negra?",
    correct: false,
    explanation:
      "Depende del contexto: caja blanca ofrece interpretabilidad, caja negra puede ofrecer mejor rendimiento.",
  },
  {
    id: 90,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿El método del codo ayuda a determinar el número óptimo de clusters en K-Means?",
    correct: true,
    explanation:
      "El método del codo analiza la inercia para encontrar el punto donde agregar más clusters no mejora significativamente.",
  },
  {
    id: 91,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿UMAP preserva mejor la estructura global que t-SNE?",
    correct: true,
    explanation:
      "UMAP preserva tanto la estructura local como global, mientras que t-SNE se enfoca principalmente en la local.",
  },
  {
    id: 92,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Los Autoencoders pueden usarse para reducción de dimensionalidad?",
    correct: true,
    explanation:
      "Los Autoencoders aprenden representaciones comprimidas que pueden usarse para reducir dimensionalidad.",
  },
  {
    id: 93,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿El clustering aglomerativo comienza con todos los puntos en un solo cluster?",
    correct: false,
    explanation: "El clustering aglomerativo comienza con cada punto como un cluster individual y los va uniendo.",
  },
  {
    id: 94,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Las reglas de asociación solo funcionan con datos categóricos?",
    correct: false,
    explanation: "Aunque son más comunes con datos categóricos, pueden aplicarse a datos numéricos discretizados.",
  },
  {
    id: 95,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿K-Means es sensible a la inicialización de centroides?",
    correct: true,
    explanation: "La inicialización de centroides puede afectar el resultado final, por eso se usa K-Means++.",
  },
  {
    id: 96,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿DBSCAN requiere normalización de datos?",
    correct: true,
    explanation:
      "DBSCAN usa distancias, por lo que la normalización es importante cuando las variables tienen diferentes escalas.",
  },
  {
    id: 97,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Los GANs consisten en dos redes neuronales que compiten?",
    correct: true,
    explanation: "Los GANs tienen un generador y un discriminador que se entrenan de forma adversaria.",
  },
  {
    id: 98,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿El clustering jerárquico siempre es más lento que K-Means?",
    correct: true,
    explanation:
      "El clustering jerárquico tiene complejidad O(n³), mientras que K-Means es O(nkt) donde k<<n y t es pequeño.",
  },
  {
    id: 99,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿PCA puede usarse como técnica de preprocesamiento?",
    correct: true,
    explanation: "PCA se usa frecuentemente para reducir dimensionalidad antes de aplicar otros algoritmos.",
  },
  {
    id: 100,
    type: "boolean",
    category: "ML No Supervisado",
    question: "¿Todos los algoritmos de clustering requieren especificar el número de clusters?",
    correct: false,
    explanation: "DBSCAN y clustering jerárquico no requieren especificar el número de clusters a priori.",
  },

  // ==================== MÉTRICAS DE EVALUACIÓN (50 preguntas) ====================

  // Preguntas de Opción Múltiple (25)
  {
    id: 101,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango del Coeficiente de Silueta?",
    options: ["[0, 1]", "[-1, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 1,
    explanation:
      "El Coeficiente de Silueta tiene rango [-1, 1]. Valores cercanos a 1 indican buena asignación, cercanos a -1 mala asignación.",
  },
  {
    id: 102,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué indica un Coeficiente de Silueta cercano a 1?",
    options: ["Mala asignación de clusters", "Buena asignación de clusters", "Clusters solapados", "Datos ruidosos"],
    correct: 1,
    explanation: "Un valor cercano a 1 indica que los puntos están bien asignados a sus clusters respectivos.",
  },
  {
    id: 103,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango del Índice Calinski-Harabasz?",
    options: ["[-1, 1]", "[0, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 2,
    explanation: "El Índice Calinski-Harabasz tiene rango [0, ∞), donde valores más altos indican mejor clustering.",
  },
  {
    id: 104,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué indican valores altos en el Índice Calinski-Harabasz?",
    options: ["Peor clustering", "Mejor clustering", "Más ruido", "Menos clusters"],
    correct: 1,
    explanation: "Valores altos indican mejor separación entre clusters y mayor cohesión dentro de cada cluster.",
  },
  {
    id: 105,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango del Índice Davies-Bouldin?",
    options: ["[-1, 1]", "[0, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 2,
    explanation: "El Índice Davies-Bouldin tiene rango [0, ∞), donde valores más bajos indican mejor clustering.",
  },
  {
    id: 106,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué indican valores bajos en el Índice Davies-Bouldin?",
    options: [
      "Peor separación entre clusters",
      "Mejor separación entre clusters",
      "Más solapamiento",
      "Datos más ruidosos",
    ],
    correct: 1,
    explanation: "Valores bajos indican que los clusters están bien separados y son compactos.",
  },
  {
    id: 107,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué mide el Error de Reconstrucción en PCA?",
    options: [
      "Calidad de clustering",
      "Pérdida de información al reducir dimensiones",
      "Número de componentes",
      "Velocidad del algoritmo",
    ],
    correct: 1,
    explanation:
      "El Error de Reconstrucción mide cuánta información se pierde al proyectar los datos a menor dimensión.",
  },
  {
    id: 108,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango de la Varianza Explicada?",
    options: ["[-1, 1]", "[0, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 1,
    explanation: "La Varianza Explicada se expresa como proporción o porcentaje, con rango [0, 1] o [0%, 100%].",
  },
  {
    id: 109,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué mide el Soporte en reglas de asociación?",
    options: [
      "Fuerza de la regla",
      "Frecuencia del conjunto de elementos",
      "Mejora sobre probabilidad base",
      "Correlación entre elementos",
    ],
    correct: 1,
    explanation: "El Soporte mide qué tan frecuente es un conjunto de elementos en el dataset total.",
  },
  {
    id: 110,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango del Soporte?",
    options: ["[-1, 1]", "[0, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 1,
    explanation:
      "El Soporte es una proporción, por tanto tiene rango [0, 1] donde 0 = nunca aparece, 1 = siempre aparece.",
  },
  {
    id: 111,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué mide la Confianza en reglas de asociación?",
    options: [
      "Frecuencia del conjunto",
      "Probabilidad condicional P(B|A)",
      "Mejora sobre probabilidad base",
      "Correlación total",
    ],
    correct: 1,
    explanation: "La Confianza mide la probabilidad de que ocurra B dado que ocurrió A en una regla A→B.",
  },
  {
    id: 112,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango de la Confianza?",
    options: ["[-1, 1]", "[0, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 1,
    explanation: "La Confianza es una probabilidad condicional, por tanto tiene rango [0, 1].",
  },
  {
    id: 113,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué indica un Lift = 1 en reglas de asociación?",
    options: [
      "Asociación positiva fuerte",
      "Asociación negativa",
      "Independencia entre elementos",
      "Error en el cálculo",
    ],
    correct: 2,
    explanation: "Lift = 1 indica que A y B son independientes, no hay asociación entre ellos.",
  },
  {
    id: 114,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué indica un Lift > 1?",
    options: ["Asociación negativa", "Asociación positiva", "Independencia", "Error en los datos"],
    correct: 1,
    explanation: "Lift > 1 indica asociación positiva: B es más probable cuando ocurre A.",
  },
  {
    id: 115,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el rango del Lift?",
    options: ["[-1, 1]", "[0, 1]", "[0, ∞)", "[-∞, ∞)"],
    correct: 2,
    explanation:
      "El Lift tiene rango [0, ∞), donde 1 es independencia, >1 asociación positiva, <1 asociación negativa.",
  },
  {
    id: 116,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué métrica se usa principalmente para evaluar la calidad de clusters?",
    options: ["Error de Reconstrucción", "Coeficiente de Silueta", "Varianza Explicada", "Lift"],
    correct: 1,
    explanation:
      "El Coeficiente de Silueta es la métrica más utilizada para evaluar qué tan bien están asignados los puntos a sus clusters.",
  },
  {
    id: 117,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué métrica ayuda a determinar el número de componentes en PCA?",
    options: ["Coeficiente de Silueta", "Índice Davies-Bouldin", "Varianza Explicada", "Confianza"],
    correct: 2,
    explanation:
      "La Varianza Explicada indica qué proporción de información se preserva con cada componente principal.",
  },
  {
    id: 118,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es la fórmula del Coeficiente de Silueta?",
    options: [
      "(a(i) - b(i)) / max(a(i), b(i))",
      "(b(i) - a(i)) / max(a(i), b(i))",
      "(a(i) + b(i)) / max(a(i), b(i))",
      "(a(i) * b(i)) / max(a(i), b(i))",
    ],
    correct: 1,
    explanation:
      "La fórmula es (b(i) - a(i)) / max(a(i), b(i)), donde a(i) es distancia intra-cluster y b(i) inter-cluster.",
  },
  {
    id: 119,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué representa 'a(i)' en el Coeficiente de Silueta?",
    options: [
      "Distancia promedio a puntos del mismo cluster",
      "Distancia promedio al cluster más cercano",
      "Número de clusters",
      "Centroide del cluster",
    ],
    correct: 0,
    explanation: "a(i) es la distancia promedio del punto i a todos los otros puntos en su mismo cluster.",
  },
  {
    id: 120,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué representa 'b(i)' en el Coeficiente de Silueta?",
    options: [
      "Distancia promedio a puntos del mismo cluster",
      "Distancia promedio al cluster más cercano",
      "Número total de puntos",
      "Distancia al centroide",
    ],
    correct: 1,
    explanation: "b(i) es la distancia promedio del punto i a todos los puntos del cluster más cercano.",
  },
  {
    id: 121,
    type: "multiple",
    category: "Métricas",
    question: "¿Para qué se usa el Leverage en reglas de asociación?",
    options: [
      "Medir frecuencia",
      "Medir diferencia entre frecuencia observada y esperada",
      "Calcular probabilidad",
      "Determinar número de reglas",
    ],
    correct: 1,
    explanation:
      "Leverage mide la diferencia entre la frecuencia observada y la esperada si A y B fueran independientes.",
  },
  {
    id: 122,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué métrica combina Soporte y Confianza?",
    options: ["Lift", "Leverage", "Conviction", "Todas las anteriores"],
    correct: 3,
    explanation: "Lift, Leverage y Conviction son métricas derivadas que combinan información de Soporte y Confianza.",
  },
  {
    id: 123,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es la métrica más robusta para clustering con outliers?",
    options: ["Coeficiente de Silueta", "Índice Calinski-Harabasz", "Índice Davies-Bouldin", "Adjusted Rand Index"],
    correct: 0,
    explanation: "El Coeficiente de Silueta es más robusto a outliers que otras métricas de clustering.",
  },
  {
    id: 124,
    type: "multiple",
    category: "Métricas",
    question: "¿Qué mide la inercia en K-Means?",
    options: [
      "Número de iteraciones",
      "Suma de distancias al cuadrado a centroides",
      "Número de clusters",
      "Tiempo de ejecución",
    ],
    correct: 1,
    explanation: "La inercia es la suma de las distancias al cuadrado de cada punto a su centroide más cercano.",
  },
  {
    id: 125,
    type: "multiple",
    category: "Métricas",
    question: "¿Cuál es el objetivo de minimizar en K-Means?",
    options: ["Número de clusters", "Inercia", "Tiempo de ejecución", "Memoria utilizada"],
    correct: 1,
    explanation: "K-Means busca minimizar la inercia (suma de distancias al cuadrado a los centroides).",
  },

  // Preguntas Verdadero/Falso Métricas (25)
  {
    id: 126,
    type: "boolean",
    category: "Métricas",
    question: "¿El Coeficiente de Silueta puede tener valores negativos?",
    correct: true,
    explanation:
      "Sí, su rango es [-1, 1]. Valores negativos indican que los puntos están mal asignados a sus clusters.",
  },
  {
    id: 127,
    type: "boolean",
    category: "Métricas",
    question: "¿Valores altos en el Índice Davies-Bouldin indican mejor clustering?",
    correct: false,
    explanation:
      "No, valores bajos indican mejor clustering. Davies-Bouldin mide la dispersión promedio dentro de clusters.",
  },
  {
    id: 128,
    type: "boolean",
    category: "Métricas",
    question: "¿La Varianza Explicada en PCA siempre debe ser 100%?",
    correct: false,
    explanation: "No, se busca un balance entre reducción de dimensionalidad y preservación de información.",
  },
  {
    id: 129,
    type: "boolean",
    category: "Métricas",
    question: "¿El Error de Reconstrucción menor indica mejor preservación de información?",
    correct: true,
    explanation: "Sí, menor error de reconstrucción significa que se pierde menos información al reducir dimensiones.",
  },
  {
    id: 130,
    type: "boolean",
    category: "Métricas",
    question: "¿Un Lift menor a 1 indica asociación negativa?",
    correct: true,
    explanation: "Sí, Lift < 1 indica que B es menos probable cuando ocurre A (asociación negativa).",
  },
  {
    id: 131,
    type: "boolean",
    category: "Métricas",
    question: "¿El Soporte mide la fuerza de una regla de asociación?",
    correct: false,
    explanation: "No, el Soporte mide frecuencia. La Confianza y el Lift miden la fuerza de la regla.",
  },
  {
    id: 132,
    type: "boolean",
    category: "Métricas",
    question: "¿La Confianza es una probabilidad condicional?",
    correct: true,
    explanation: "Sí, la Confianza mide P(B|A) en reglas de asociación A→B.",
  },
  {
    id: 133,
    type: "boolean",
    category: "Métricas",
    question: "¿El Índice Calinski-Harabasz se usa para evaluar reducción de dimensionalidad?",
    correct: false,
    explanation: "No, se usa específicamente para evaluar la calidad de clustering.",
  },
  {
    id: 134,
    type: "boolean",
    category: "Métricas",
    question: "¿Todas las métricas de clustering tienen el mismo rango?",
    correct: false,
    explanation: "No, tienen rangos diferentes: Silueta [-1,1], Calinski-Harabasz [0,∞), Davies-Bouldin [0,∞).",
  },
  {
    id: 135,
    type: "boolean",
    category: "Métricas",
    question: "¿El Lift = 1 indica una regla de asociación muy fuerte?",
    correct: false,
    explanation: "No, Lift = 1 indica independencia entre elementos, no asociación fuerte.",
  },
  {
    id: 136,
    type: "boolean",
    category: "Métricas",
    question: "¿La inercia en K-Means siempre disminuye al aumentar el número de clusters?",
    correct: true,
    explanation: "Sí, más clusters siempre reducen la inercia, pero pueden llevar a overfitting.",
  },
  {
    id: 137,
    type: "boolean",
    category: "Métricas",
    question: "¿El método del codo usa la inercia para determinar k óptimo?",
    correct: true,
    explanation: "Sí, busca el punto donde la reducción de inercia se vuelve marginal al agregar más clusters.",
  },
  {
    id: 138,
    type: "boolean",
    category: "Métricas",
    question: "¿El Coeficiente de Silueta es sensible a la forma de los clusters?",
    correct: true,
    explanation: "Sí, funciona mejor con clusters esféricos y puede dar resultados engañosos con formas irregulares.",
  },
  {
    id: 139,
    type: "boolean",
    category: "Métricas",
    question: "¿La Varianza Explicada acumulada debe llegar a 1.0?",
    correct: true,
    explanation: "Sí, si se incluyen todos los componentes principales, la varianza explicada acumulada es 100%.",
  },
  {
    id: 140,
    type: "boolean",
    category: "Métricas",
    question: "¿El Leverage puede ser negativo?",
    correct: true,
    explanation: "Sí, Leverage puede ser negativo cuando la frecuencia observada es menor que la esperada.",
  },
  {
    id: 141,
    type: "boolean",
    category: "Métricas",
    question: "¿Conviction es una métrica simétrica?",
    correct: false,
    explanation: "No, Conviction(A→B) ≠ Conviction(B→A), es una métrica direccional.",
  },
  {
    id: 142,
    type: "boolean",
    category: "Métricas",
    question: "¿El Adjusted Rand Index corrige por el azar?",
    correct: true,
    explanation: "Sí, ARI ajusta el Rand Index para corregir la concordancia esperada por azar.",
  },
  {
    id: 143,
    type: "boolean",
    category: "Métricas",
    question: "¿El Índice Davies-Bouldin penaliza clusters muy dispersos?",
    correct: true,
    explanation: "Sí, penaliza clusters con alta dispersión interna y baja separación entre clusters.",
  },
  {
    id: 144,
    type: "boolean",
    category: "Métricas",
    question: "¿La métrica de Homogeneidad mide si cada cluster contiene solo miembros de una clase?",
    correct: true,
    explanation: "Sí, la Homogeneidad evalúa si los clusters son puros en términos de las clases verdaderas.",
  },
  {
    id: 145,
    type: "boolean",
    category: "Métricas",
    question: "¿El Coeficiente de Silueta promedio siempre es mejor que el individual?",
    correct: false,
    explanation:
      "No, el promedio puede ocultar clusters mal formados. Es importante analizar la distribución completa.",
  },
  {
    id: 146,
    type: "boolean",
    category: "Métricas",
    question: "¿La Completitud mide si todos los miembros de una clase están en el mismo cluster?",
    correct: true,
    explanation: "Sí, la Completitud evalúa si todos los puntos de una clase verdadera están agrupados juntos.",
  },
  {
    id: 147,
    type: "boolean",
    category: "Métricas",
    question: "¿El V-measure combina Homogeneidad y Completitud?",
    correct: true,
    explanation: "Sí, V-measure es la media armónica entre Homogeneidad y Completitud.",
  },
  {
    id: 148,
    type: "boolean",
    category: "Métricas",
    question: "¿Las métricas externas de clustering requieren etiquetas verdaderas?",
    correct: true,
    explanation: "Sí, métricas como ARI, V-measure requieren conocer las clases verdaderas para comparar.",
  },
  {
    id: 149,
    type: "boolean",
    category: "Métricas",
    question: "¿El Mutual Information mide la dependencia entre clustering y clases verdaderas?",
    correct: true,
    explanation: "Sí, MI mide cuánta información comparten las asignaciones de clusters y las clases reales.",
  },
  {
    id: 150,
    type: "boolean",
    category: "Métricas",
    question: "¿Es posible tener alta Confianza pero bajo Soporte en una regla de asociación?",
    correct: true,
    explanation: "Sí, una regla puede ser muy confiable pero aplicarse a pocos casos (bajo soporte).",
  },
]

// Agregar filtros por tipo de pregunta

const shuffleQuestions = (questionsArray: typeof allQuestions, category = "all", type = "all") => {
  let filteredQuestions = questionsArray

  if (category !== "all") {
    filteredQuestions = filteredQuestions.filter((q) => q.category === category)
  }

  if (type !== "all") {
    filteredQuestions = filteredQuestions.filter((q) => q.type === type)
  }

  // Mezclar aleatoriamente
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)

  // Tomar máximo 20 preguntas para que no sea muy largo
  return shuffled.slice(0, 20)
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [questions, setQuestions] = useState<typeof allQuestions>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [questionType, setQuestionType] = useState<string>("all")

  // Función para mezclar preguntas aleatoriamente

  useEffect(() => {
    // Inicializar con preguntas aleatorias
    setQuestions(shuffleQuestions(allQuestions))
  }, [])

  const question = questions[currentQuestion]
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setQuestions(shuffleQuestions(allQuestions, category, questionType))
    resetQuiz()
  }

  const handleQuestionTypeChange = (type: string) => {
    setQuestionType(type)
    setQuestions(shuffleQuestions(allQuestions, selectedCategory, type))
    resetQuiz()
  }

  const handleAnswer = () => {
    if (!selectedAnswer || !question) return

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
    if (currentQuestion < questions.length - 1) {
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

  const newRandomQuiz = () => {
    setQuestions(shuffleQuestions(allQuestions, selectedCategory, questionType))
    resetQuiz()
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

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p>Cargando preguntas...</p>
          </div>
        </div>
      </div>
    )
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
                  {score}/{questions.length}
                </div>
                <div className="text-lg text-gray-600">
                  {((score / questions.length) * 100).toFixed(0)}% de aciertos
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
                  <Button onClick={newRandomQuiz}>
                    <Shuffle className="w-4 h-4 mr-2" />
                    Nuevo Quiz Aleatorio
                  </Button>
                  <Button onClick={resetQuiz} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Repetir Quiz
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
            <h1 className="text-3xl font-bold text-gray-900">Quiz ML Aleatorio</h1>
          </div>
          <div className="text-sm text-gray-600">
            Puntuación: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
        </div>

        {/* Category Selector */}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros de Preguntas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Filtro por Categoría */}
              <div>
                <h4 className="font-medium mb-2">Por Categoría:</h4>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => handleCategoryChange("all")}
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                  >
                    Todas las categorías
                  </Button>
                  <Button
                    onClick={() => handleCategoryChange("ML Supervisado")}
                    variant={selectedCategory === "ML Supervisado" ? "default" : "outline"}
                    size="sm"
                  >
                    ML Supervisado
                  </Button>
                  <Button
                    onClick={() => handleCategoryChange("ML No Supervisado")}
                    variant={selectedCategory === "ML No Supervisado" ? "default" : "outline"}
                    size="sm"
                  >
                    ML No Supervisado
                  </Button>
                  <Button
                    onClick={() => handleCategoryChange("Métricas")}
                    variant={selectedCategory === "Métricas" ? "default" : "outline"}
                    size="sm"
                  >
                    Métricas
                  </Button>
                </div>
              </div>

              {/* Filtro por Tipo de Pregunta */}
              <div>
                <h4 className="font-medium mb-2">Por Tipo:</h4>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={() => handleQuestionTypeChange("all")}
                    variant={questionType === "all" ? "default" : "outline"}
                    size="sm"
                  >
                    Todos los tipos
                  </Button>
                  <Button
                    onClick={() => handleQuestionTypeChange("multiple")}
                    variant={questionType === "multiple" ? "default" : "outline"}
                    size="sm"
                  >
                    Opción Múltiple
                  </Button>
                  <Button
                    onClick={() => handleQuestionTypeChange("boolean")}
                    variant={questionType === "boolean" ? "default" : "outline"}
                    size="sm"
                  >
                    Verdadero/Falso
                  </Button>
                </div>
              </div>

              {/* Botón Nuevo Quiz */}
              <div>
                <Button onClick={newRandomQuiz} variant="outline" size="sm">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Nuevo Quiz Aleatorio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Pregunta {currentQuestion + 1} de {questions.length}
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
              {currentQuestion < questions.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
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
              <li>
                • <strong>150 preguntas total:</strong> 50 por cada PDF (ML Supervisado, ML No Supervisado, Métricas)
              </li>
              <li>
                • <strong>Filtros disponibles:</strong> Por categoría y por tipo de pregunta
              </li>
              <li>
                • <strong>Opción Múltiple:</strong> 75 preguntas con 4 alternativas cada una
              </li>
              <li>
                • <strong>Verdadero/Falso:</strong> 75 preguntas de respuesta binaria
              </li>
              <li>• Cada quiz muestra 20 preguntas aleatorias según los filtros seleccionados</li>
              <li>• Usa "Nuevo Quiz" para generar preguntas diferentes con los mismos filtros</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
