import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Inicializar Gemini con la API key
const genAI = new GoogleGenerativeAI("AIzaSyDyvqK9lxycO_GrxhMNgS3VLQbWsU2zhOs")

// Contenido detallado de los PDFs para el contexto
const pdfContent = {
  supervised: `
    MACHINE LEARNING SUPERVISADO - CONTENIDO COMPLETO:
    
    CICLO DE VIDA DE 10 FASES:
    1. Definición del problema: Traducir problema de negocio a tarea de ML (clasificación/regresión)
    2. Recolección de datos: Reunir datos etiquetados de calidad, validar instancias
    3. Preparación de datos: Limpieza, transformación, feature engineering, SMOTE para balanceo
    4. División del conjunto: 70-80% entrenamiento, 20-30% prueba, estratificación
    5. Selección del modelo: Elegir algoritmo según problema, datos, interpretabilidad
    6. Entrenamiento: model.fit(X_train, y_train), monitoreo de convergencia
    7. Evaluación: Métricas en datos de prueba, matriz de confusión, curvas ROC
    8. Optimización: Grid Search, Random Search, validación cruzada k-fold
    9. Implementación: Serialización (.pkl/.joblib), APIs REST, containerización
    10. Mantenimiento: Monitoreo, data drift, concept drift, reentrenamiento
    
    CONCEPTOS CLAVE:
    - Pipelines: Reproducibilidad, evitar data leakage, orden de transformaciones
    - SMOTE: Synthetic Minority Oversampling Technique para clases desbalanceadas
    - Validación cruzada: k-fold para estimación robusta del rendimiento
    - MLOps: DevOps para ML, CI/CD, monitoreo en producción
    - Data drift: Cambios en distribución de entrada X
    - Concept drift: Cambios en relación X→y
    - A/B testing: Comparar modelos en producción
    - Shadow deployment: Validar sin afectar sistema activo
    - Feature engineering: Crear características relevantes
    - Hiperparámetros vs parámetros: Configurados vs aprendidos
  `,
  unsupervised: `
    MACHINE LEARNING NO SUPERVISADO - CONTENIDO COMPLETO:
    
    TRES TÉCNICAS PRINCIPALES:
    
    1. CLUSTERING (AGRUPAMIENTO):
    - K-Means: Clusters esféricos, requiere especificar k, actualiza centroides iterativamente
      * Ventajas: Rápido, interpretable, escalable
      * Desventajas: Asume clusters esféricos, sensible a outliers
      * Parámetros: n_clusters, init, max_iter
    - DBSCAN: Clusters arbitrarios, detecta outliers automáticamente, basado en densidad
      * Ventajas: Cualquier forma, detecta ruido, no requiere k
      * Desventajas: Sensible a eps y min_samples
      * Parámetros: eps (radio), min_samples
    - Clustering Jerárquico: Crea dendrogramas, aglomerativo vs divisivo
      * Ventajas: No requiere k, determinístico, visualizable
      * Desventajas: O(n³), sensible a outliers
    
    2. REDUCCIÓN DE DIMENSIONALIDAD:
    - PCA: Técnica lineal, componentes principales, preserva varianza máxima
      * Ventajas: Interpretable, elimina correlaciones, reduce ruido
      * Desventajas: Solo relaciones lineales
    - t-SNE: No lineal, preserva relaciones locales, ideal para visualización 2D/3D
      * Ventajas: Excelente visualización, maneja no linealidad
      * Desventajas: Solo visualización, computacionalmente costoso
    - UMAP: Preserva estructura local y global, más rápido que t-SNE
      * Ventajas: Preserva estructura global, escalable
      * Desventajas: Menos interpretable que PCA
    
    3. REGLAS DE ASOCIACIÓN:
    - Algoritmo Apriori: Market basket analysis, encuentra patrones frecuentes
      * Métricas: Soporte (frecuencia), Confianza (P(B|A)), Lift (mejora sobre base)
      * Aplicaciones: Recomendaciones, análisis de cestas
    
    ALGORITMOS CAJA BLANCA VS CAJA NEGRA:
    - Caja Blanca: K-Means, PCA, Apriori (interpretables, entendibles)
    - Caja Negra: t-SNE, Autoencoders, GANs (mayor capacidad, menos interpretables)
    
    CONDICIONES DE USO:
    - Datos sin etiquetar disponibles
    - Exploración y descubrimiento de patrones
    - Reducción de complejidad dimensional
    - Segmentación de usuarios/productos
    - Detección de anomalías
  `,
  metrics: `
    MÉTRICAS DE EVALUACIÓN ML NO SUPERVISADO - CONTENIDO COMPLETO:
    
    MÉTRICAS DE CLUSTERING:
    
    1. Coeficiente de Silueta:
    - Fórmula: s(i) = (b(i) - a(i)) / max(a(i), b(i))
    - Rango: [-1, 1]
    - Interpretación: Cercano a 1 = excelente, cercano a 0 = solapados, cercano a -1 = mala asignación
    - a(i): distancia promedio intra-cluster
    - b(i): distancia promedio al cluster más cercano
    
    2. Índice Calinski-Harabasz:
    - Fórmula: CH = (SSB/(k-1)) / (SSW/(n-k))
    - Rango: [0, ∞)
    - Interpretación: Valores más altos = mejor clustering
    - Mide separación entre clusters vs cohesión interna
    
    3. Índice Davies-Bouldin:
    - Fórmula: DB = (1/k) Σ max((σi + σj)/d(ci,cj))
    - Rango: [0, ∞)
    - Interpretación: Valores más bajos = mejor clustering
    - Penaliza clusters dispersos y mal separados
    
    4. Inercia (WCSS):
    - Fórmula: WCSS = Σ Σ ||xi - cj||²
    - Uso: Método del codo para determinar k óptimo en K-Means
    - Siempre decrece al aumentar k
    
    MÉTRICAS DE REDUCCIÓN DE DIMENSIONALIDAD:
    
    1. Varianza Explicada:
    - Fórmula: VE = Σλi / Σλtotal
    - Rango: [0, 1] o [0%, 100%]
    - Interpretación: Proporción de información preservada
    - Típico: 85-95% para buena preservación
    
    2. Error de Reconstrucción:
    - Fórmula: RE = ||X - X̂||²
    - Rango: [0, ∞)
    - Interpretación: Menor error = mejor preservación
    - Aplicable a cualquier técnica de reducción
    
    MÉTRICAS DE REGLAS DE ASOCIACIÓN:
    
    1. Soporte:
    - Fórmula: Support(A) = |A| / |D|
    - Rango: [0, 1]
    - Interpretación: Frecuencia del conjunto en el dataset
    - Típico: 0.01-0.1 (1-10%)
    
    2. Confianza:
    - Fórmula: Confidence(A→B) = Support(A∪B) / Support(A)
    - Rango: [0, 1]
    - Interpretación: Probabilidad condicional P(B|A)
    - Típico: 0.5-0.9 (50-90%)
    
    3. Lift:
    - Fórmula: Lift(A→B) = Confidence(A→B) / Support(B)
    - Rango: [0, ∞)
    - Interpretación: >1 asociación positiva, =1 independencia, <1 negativa
    - Típico: >1.2 para asociaciones interesantes
    
    MÉTRICAS EXTERNAS (requieren etiquetas verdaderas):
    - Adjusted Rand Index (ARI): Corrige concordancia aleatoria
    - Normalized Mutual Information (NMI): Información compartida
    - Homogeneidad: Cada cluster contiene solo una clase
    - Completitud: Toda clase está en un cluster
    - V-measure: Media armónica de homogeneidad y completitud
  `,
}

export async function POST(request: NextRequest) {
  try {
    const { source, count } = await request.json()

    // Seleccionar contenido según la fuente
    let content = ""
    let sourceLabel = ""

    switch (source) {
      case "supervised":
        content = pdfContent.supervised
        sourceLabel = "ML Supervisado"
        break
      case "unsupervised":
        content = pdfContent.unsupervised
        sourceLabel = "ML No Supervisado"
        break
      case "metrics":
        content = pdfContent.metrics
        sourceLabel = "Métricas de Evaluación"
        break
      case "all":
        content = Object.values(pdfContent).join("\n\n")
        sourceLabel = "Todos los PDFs"
        break
      default:
        content = pdfContent.supervised
        sourceLabel = "ML Supervisado"
    }

    // Crear el prompt para Gemini
    const prompt = `
Eres un experto en Machine Learning creando preguntas de examen de alta calidad.

CONTENIDO DE REFERENCIA:
${content}

INSTRUCCIONES:
1. Genera exactamente ${count} preguntas basadas ÚNICAMENTE en el contenido proporcionado
2. Cada pregunta debe tener formato de opción múltiple con exactamente 5 opciones (A, B, C, D, E)
3. Solo UNA opción debe ser correcta
4. Las opciones incorrectas deben ser plausibles pero claramente incorrectas para alguien que conoce el tema
5. Incluye una explicación detallada de por qué la respuesta correcta es correcta
6. Varía el tipo de preguntas: conceptuales, de aplicación, de análisis, de comparación
7. Asegúrate de que las preguntas cubran diferentes aspectos del contenido

FORMATO DE RESPUESTA (JSON válido):
{
  "questions": [
    {
      "question": "Texto de la pregunta aquí",
      "options": [
        "Opción A",
        "Opción B", 
        "Opción C",
        "Opción D",
        "Opción E"
      ],
      "correct": 0,
      "explanation": "Explicación detallada de por qué la opción A es correcta y por qué las otras son incorrectas",
      "source": "${sourceLabel}"
    }
  ]
}

IMPORTANTE: 
- El campo "correct" debe ser el índice (0-4) de la opción correcta
- Responde SOLO con el JSON válido, sin texto adicional
- Las preguntas deben ser desafiantes pero justas
- Evita preguntas triviales o demasiado obvias
- Incluye números, fórmulas y rangos específicos cuando sea relevante
`

    // Llamar a Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Limpiar la respuesta y parsear JSON
    let cleanedText = text.trim()

    // Remover posibles marcadores de código
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    let parsedResponse
    try {
      parsedResponse = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError)
      console.error("Raw response:", text)

      // Fallback con preguntas de ejemplo si falla el parsing
      const fallbackQuestions = [
        {
          question: "¿Cuál es el principal objetivo de usar pipelines en Machine Learning supervisado?",
          options: [
            "Acelerar significativamente el tiempo de entrenamiento",
            "Reducir el consumo de memoria durante el procesamiento",
            "Garantizar reproducibilidad y evitar data leakage",
            "Aumentar automáticamente la precisión del modelo",
            "Eliminar la necesidad de validación cruzada",
          ],
          correct: 2,
          explanation:
            "Los pipelines en ML garantizan que todas las transformaciones se apliquen de manera consistente y en el orden correcto, evitando data leakage (filtración de información del conjunto de prueba al entrenamiento) y asegurando reproducibilidad. Esto es fundamental para mantener la integridad científica del proceso de ML.",
          source: sourceLabel,
        },
      ]

      return NextResponse.json({
        questions: fallbackQuestions.slice(0, count),
        message: `Generadas ${Math.min(fallbackQuestions.length, count)} preguntas de ${sourceLabel} (modo fallback)`,
        warning: "Se usaron preguntas de ejemplo debido a un error en la generación con IA",
      })
    }

    // Validar estructura de la respuesta
    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      throw new Error("Respuesta de IA no tiene el formato esperado")
    }

    // Validar cada pregunta
    const validatedQuestions = parsedResponse.questions.map((q: any, index: number) => {
      if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length !== 5) {
        throw new Error(`Pregunta ${index + 1} no tiene el formato correcto`)
      }

      if (typeof q.correct !== "number" || q.correct < 0 || q.correct > 4) {
        throw new Error(`Pregunta ${index + 1} no tiene un índice de respuesta correcta válido`)
      }

      return {
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation || "Explicación no disponible",
        source: sourceLabel,
      }
    })

    return NextResponse.json({
      questions: validatedQuestions.slice(0, count),
      message: `Generadas ${Math.min(validatedQuestions.length, count)} preguntas de ${sourceLabel} con IA`,
      success: true,
    })
  } catch (error) {
    console.error("Error generating questions with Gemini:", error)

    // Preguntas de ejemplo como fallback
    const fallbackQuestions = [
      {
        question: "En el contexto de DBSCAN, ¿qué parámetro determina el radio de búsqueda de vecinos?",
        options: [
          "min_samples - número mínimo de puntos para formar un cluster",
          "eps - radio máximo de búsqueda de vecinos",
          "max_iter - número máximo de iteraciones",
          "n_clusters - número de clusters a formar",
          "metric - tipo de distancia a utilizar",
        ],
        correct: 1,
        explanation:
          "El parámetro 'eps' (epsilon) en DBSCAN define el radio máximo dentro del cual se buscan vecinos para cada punto. Junto con 'min_samples', determina si un punto es core, border o noise. Un eps muy pequeño puede resultar en muchos puntos marcados como ruido, mientras que un eps muy grande puede unir clusters que deberían estar separados.",
        source: "ML No Supervisado",
      },
      {
        question: "Si el Coeficiente de Silueta promedio es 0.75, ¿qué indica sobre la calidad del clustering?",
        options: [
          "Calidad muy pobre con clusters completamente solapados",
          "Calidad aceptable pero con margen de mejora",
          "Calidad excelente con clusters bien definidos y separados",
          "Resultado inválido que requiere recálculo",
          "Calidad promedio que necesita optimización de parámetros",
        ],
        correct: 2,
        explanation:
          "Un Coeficiente de Silueta de 0.75 indica una calidad excelente de clustering. Los valores entre 0.7-1.0 sugieren que los puntos están muy bien asignados a sus clusters respectivos, con alta cohesión interna y buena separación entre clusters. Esto indica que el algoritmo y parámetros elegidos son apropiados para los datos.",
        source: "Métricas de Evaluación",
      },
    ]

    return NextResponse.json(
      {
        questions: fallbackQuestions.slice(0, Number.parseInt(request.url.split("count=")[1]) || 5),
        message: "Error en la generación con IA, usando preguntas de ejemplo",
        error: error instanceof Error ? error.message : "Error desconocido",
        success: false,
      },
      { status: 200 },
    ) // Devolvemos 200 para que el frontend maneje el fallback
  }
}
