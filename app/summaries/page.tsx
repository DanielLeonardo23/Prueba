"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Target, Brain, BarChart3, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const summaryData = {
  supervised: {
    title: "Machine Learning Supervisado",
    icon: Target,
    color: "bg-blue-500",
    keyPoints: [
      "Proceso sistemático de 10 fases para desarrollar modelos que aprenden de datos etiquetados",
      "Requiere datos con variable objetivo (etiqueta) conocida para entrenar y evaluar",
      "División típica: 70-80% entrenamiento, 20-30% prueba con estratificación",
      "Uso obligatorio de pipelines para mantener reproducibilidad y evitar data leakage",
      "Validación cruzada k-fold para estimación robusta del rendimiento",
      "MLOps esencial para despliegue, monitoreo y mantenimiento en producción",
    ],
    phases: [
      {
        phase: "1. Definición del Problema",
        key: "Traducir problema de negocio a tarea de ML",
        details: [
          "🎯 Determinar tipo: clasificación (categórica) o regresión (numérica)",
          "🏷️ Definir variable objetivo (etiqueta/target) claramente",
          "📊 Identificar variables de entrada (features) disponibles",
          "📈 Establecer métricas de éxito del negocio y técnicas",
          "⚖️ Considerar restricciones: tiempo, recursos, interpretabilidad",
          "🔍 Analizar si realmente necesita ML o si hay solución más simple",
        ],
        examples: [
          "Clasificación: ¿Este email es spam? (Sí/No)",
          "Regresión: ¿Cuál será el precio de esta casa? ($150,000)",
          "Multiclase: ¿Qué tipo de flor es? (Rosa/Tulipán/Girasol)",
        ],
        tools: ["Reuniones con stakeholders", "Análisis de requerimientos", "Definición de KPIs"],
      },
      {
        phase: "2. Recolección de Datos",
        key: "Reunir datos etiquetados de calidad suficiente",
        details: [
          "🗂️ Localizar fuentes internas: bases de datos, logs, sistemas",
          "🌐 Explorar fuentes externas: APIs, datasets públicos, web scraping",
          "✅ Validar que las instancias estén correctamente etiquetadas",
          "📏 Asegurar volumen suficiente: regla general 10x features mínimo",
          "🎯 Verificar representatividad de todas las clases/rangos",
          "📋 Documentar origen, fecha, método de recolección",
          "⚖️ Considerar aspectos legales y éticos de los datos",
        ],
        examples: [
          "Datos internos: Historial de ventas con resultados",
          "APIs: Datos meteorológicos para predicción agrícola",
          "Etiquetado manual: Clasificación de imágenes médicas",
        ],
        tools: ["SQL queries", "APIs REST", "Web scraping", "Herramientas de etiquetado"],
      },
      {
        phase: "3. Preparación de Datos",
        key: "Limpiar, transformar y preparar datos para ML",
        details: [
          "🧹 Limpieza: detectar y manejar valores nulos, duplicados, inconsistentes",
          "🔄 Transformación: categóricas → numéricas (Label/One-Hot Encoding)",
          "📐 Escalado/normalización: StandardScaler, MinMaxScaler, RobustScaler",
          "⚖️ Balanceo de clases: SMOTE, undersampling, oversampling",
          "🔧 Feature engineering: crear nuevas características relevantes",
          "🚫 Detección de outliers: métodos estadísticos, IQR, Z-score",
          "📊 Análisis exploratorio de datos (EDA) completo",
        ],
        examples: [
          "Imputación: Rellenar edad faltante con mediana por grupo",
          "Encoding: 'Alto/Medio/Bajo' → [2,1,0] (ordinal)",
          "Escalado: Normalizar salarios ($30K-$200K) → (0-1)",
        ],
        tools: ["pandas", "scikit-learn", "matplotlib", "seaborn", "missingno"],
      },
      {
        phase: "4. División del Conjunto",
        key: "Separar datos: entrenamiento vs prueba de forma estratificada",
        details: [
          "📊 Proporción estándar: 70-80% entrenamiento, 20-30% prueba",
          "🎯 Estratificación: mantener proporción de clases en ambos conjuntos",
          "🔀 Aleatorización: usar random_state para reproducibilidad",
          "⏰ Consideración temporal: datos más recientes para prueba si aplica",
          "🔄 Validación cruzada: k-fold (típicamente k=5 o k=10)",
          "🚫 Nunca usar datos de prueba durante entrenamiento o tuning",
          "📈 Conjunto de validación adicional si dataset es muy grande",
        ],
        examples: [
          "train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)",
          "TimeSeriesSplit para datos temporales",
          "StratifiedKFold para validación cruzada balanceada",
        ],
        tools: ["train_test_split", "StratifiedKFold", "TimeSeriesSplit"],
      },
      {
        phase: "5. Selección del Modelo",
        key: "Elegir algoritmo más adecuado según el problema",
        details: [
          "🎯 Tipo de problema: clasificación vs regresión vs ranking",
          "📊 Tamaño del dataset: algoritmos simples vs complejos",
          "🔍 Interpretabilidad requerida: caja blanca vs caja negra",
          "⚡ Recursos computacionales: tiempo de entrenamiento e inferencia",
          "📈 Complejidad de relaciones: lineales vs no lineales",
          "🎛️ Número de características: curse of dimensionality",
          "🔄 Capacidad de actualización: batch vs online learning",
        ],
        examples: [
          "Pocos datos + interpretabilidad → Regresión Logística",
          "Muchos datos + alta precisión → Random Forest/XGBoost",
          "Datos no lineales complejos → Neural Networks",
        ],
        tools: ["scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "PyTorch"],
      },
      {
        phase: "6. Entrenamiento del Modelo",
        key: "Ajustar parámetros del modelo con datos de entrenamiento",
        details: [
          "🔧 Configurar hiperparámetros iniciales (valores por defecto)",
          "📚 Entrenar modelo: model.fit(X_train, y_train)",
          "⏱️ Monitorear tiempo de entrenamiento y convergencia",
          "📊 Validar durante entrenamiento con conjunto de validación",
          "🔄 Implementar early stopping para evitar overfitting",
          "💾 Guardar checkpoints del modelo durante entrenamiento",
          "📈 Registrar métricas de entrenamiento para análisis posterior",
        ],
        examples: [
          "RandomForestClassifier().fit(X_train, y_train)",
          "Callbacks en Keras para early stopping",
          "Validación en cada época para neural networks",
        ],
        tools: ["fit() methods", "Callbacks", "TensorBoard", "MLflow"],
      },
      {
        phase: "7. Evaluación del Modelo",
        key: "Medir rendimiento con datos de prueba no vistos",
        details: [
          "🎯 Métricas de clasificación: accuracy, precision, recall, F1-score",
          "📊 Métricas de regresión: MAE, MSE, RMSE, R²",
          "📈 Matriz de confusión para análisis detallado de errores",
          "📉 Curvas ROC y AUC para problemas de clasificación binaria",
          "🔍 Análisis de residuos para problemas de regresión",
          "⚖️ Validación cruzada para estimación robusta",
          "🎪 Comparación con baseline y modelos simples",
        ],
        examples: [
          "classification_report(y_test, y_pred)",
          "confusion_matrix(y_test, y_pred)",
          "roc_auc_score(y_test, y_pred_proba)",
        ],
        tools: ["scikit-learn.metrics", "seaborn", "matplotlib", "yellowbrick"],
      },
      {
        phase: "8. Optimización de Hiperparámetros",
        key: "Encontrar la mejor configuración del modelo",
        details: [
          "🔍 Grid Search: búsqueda exhaustiva en espacio definido",
          "🎲 Random Search: búsqueda aleatoria, más eficiente",
          "🎯 Bayesian Optimization: métodos más sofisticados",
          "📊 Validación cruzada obligatoria durante tuning",
          "⏱️ Considerar tiempo computacional vs mejora obtenida",
          "📈 Evitar overfitting al conjunto de validación",
          "🔄 Usar pipelines para incluir preprocesamiento en tuning",
        ],
        examples: [
          "GridSearchCV(estimator, param_grid, cv=5)",
          "RandomizedSearchCV para espacios grandes",
          "Optuna para optimización bayesiana",
        ],
        tools: ["GridSearchCV", "RandomizedSearchCV", "Optuna", "Hyperopt"],
      },
      {
        phase: "9. Implementación (Deployment)",
        key: "Poner el modelo en producción para uso real",
        details: [
          "💾 Serialización: guardar modelo en formato portable (.pkl, .joblib)",
          "🌐 API REST: crear endpoints para predicciones",
          "🐳 Containerización: Docker para portabilidad",
          "☁️ Cloud deployment: AWS, GCP, Azure ML",
          "⚡ Optimización de latencia: batch vs real-time predictions",
          "🔒 Seguridad: autenticación, autorización, validación de inputs",
          "📊 Logging: registrar predicciones y métricas de uso",
        ],
        examples: [
          "joblib.dump(model, 'model.pkl')",
          "Flask/FastAPI para crear APIs",
          "Docker containers para deployment",
        ],
        tools: ["joblib", "Flask", "FastAPI", "Docker", "Kubernetes"],
      },
      {
        phase: "10. Mantenimiento y Monitoreo",
        key: "Asegurar funcionamiento continuo y actualización",
        details: [
          "📊 Monitoreo de performance: accuracy, latencia, throughput",
          "🔍 Detección de data drift: cambios en distribución de entrada",
          "🎯 Detección de concept drift: cambios en relación X→y",
          "🔄 Reentrenamiento automático: triggers y pipelines",
          "📈 A/B testing: comparar modelos en producción",
          "🚨 Alertas: notificaciones cuando performance degrada",
          "📋 Versionado de modelos: rollback capabilities",
        ],
        examples: [
          "Evidently AI para drift detection",
          "MLflow para model registry",
          "Prometheus + Grafana para monitoreo",
        ],
        tools: ["MLflow", "Evidently", "Prometheus", "Grafana", "Airflow"],
      },
    ],
    pipeline_example: {
      title: "Ejemplo Completo de Pipeline",
      code: `
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

# 1. Crear pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(random_state=42))
])

# 2. Definir hiperparámetros
param_grid = {
    'classifier__n_estimators': [100, 200],
    'classifier__max_depth': [10, 20, None]
}

# 3. Optimización con validación cruzada
grid_search = GridSearchCV(
    pipeline, param_grid, cv=5, 
    scoring='accuracy', n_jobs=-1
)

# 4. Entrenar
grid_search.fit(X_train, y_train)

# 5. Evaluar
best_model = grid_search.best_estimator_
accuracy = best_model.score(X_test, y_test)
      `,
    },
  },
  unsupervised: {
    title: "Machine Learning No Supervisado",
    icon: Brain,
    color: "bg-green-500",
    keyPoints: [
      "Descubre patrones ocultos en datos sin etiquetas de forma automática",
      "3 técnicas principales: Clustering, Reducción de dimensionalidad, Reglas de asociación",
      "Evaluación más subjetiva y dependiente del contexto del negocio",
      "Algoritmos de caja blanca (interpretables) vs caja negra (mayor capacidad)",
      "Aplicaciones: segmentación, visualización, recomendaciones, detección de anomalías",
      "Preprocesamiento crítico: normalización y selección de características",
    ],
    techniques: [
      {
        name: "1. Clustering (Agrupamiento)",
        description: "Agrupar datos similares en conjuntos homogéneos sin conocer las categorías a priori",
        algorithms: [
          {
            name: "K-Means",
            type: "Caja Blanca",
            use: "Segmentación de clientes, grupos esféricos, datasets grandes",
            characteristics: "Divide en k clusters, actualiza centroides iterativamente, asume clusters esféricos",
            pros: ["Rápido y eficiente", "Fácil de interpretar", "Funciona bien con clusters esféricos"],
            cons: ["Requiere especificar k", "Sensible a outliers", "Asume clusters de tamaño similar"],
            parameters: ["n_clusters (k)", "init (inicialización)", "max_iter", "random_state"],
            example: "Segmentar clientes por comportamiento de compra en 5 grupos",
          },
          {
            name: "DBSCAN",
            type: "Caja Blanca",
            use: "Detección de anomalías, clusters arbitrarios, datos con ruido",
            characteristics: "Agrupa puntos densamente conectados, marca ruido automáticamente",
            pros: ["Encuentra clusters de cualquier forma", "Detecta outliers", "No requiere especificar k"],
            cons: ["Sensible a parámetros eps y min_samples", "Dificultad con densidades variables"],
            parameters: ["eps (radio de vecindario)", "min_samples (puntos mínimos)", "metric"],
            example: "Detectar fraudes en transacciones bancarias",
          },
          {
            name: "Clustering Jerárquico",
            type: "Caja Blanca",
            use: "Visualización de estructuras, taxonomías, análisis exploratorio",
            characteristics: "Crea jerarquía mediante fusiones (aglomerativo) o divisiones (divisivo)",
            pros: ["No requiere especificar k", "Produce dendrograma interpretable", "Determinístico"],
            cons: ["Computacionalmente costoso O(n³)", "Sensible a outliers", "Difícil de escalar"],
            parameters: ["linkage (ward, complete, average)", "distance_threshold", "n_clusters"],
            example: "Crear taxonomía de especies basada en características genéticas",
          },
        ],
        metrics: [
          "Coeficiente de Silueta: [-1, 1] - Calidad de asignación",
          "Índice Calinski-Harabasz: [0, ∞) - Separación entre clusters",
          "Índice Davies-Bouldin: [0, ∞) - Compacidad y separación",
          "Inercia: Suma de distancias al cuadrado a centroides",
        ],
      },
      {
        name: "2. Reducción de Dimensionalidad",
        description: "Representar datos en espacios de menor dimensión preservando información importante",
        algorithms: [
          {
            name: "PCA (Principal Component Analysis)",
            type: "Caja Blanca",
            use: "Visualización, preprocesamiento, compresión de datos",
            characteristics: "Componentes principales que capturan máxima varianza, transformación lineal",
            pros: ["Interpretable", "Reduce ruido", "Elimina correlaciones"],
            cons: ["Solo relaciones lineales", "Componentes pueden ser difíciles de interpretar"],
            parameters: ["n_components", "whiten", "svd_solver"],
            example: "Reducir 1000 características de imágenes a 50 componentes principales",
          },
          {
            name: "t-SNE",
            type: "Caja Negra",
            use: "Visualización 2D/3D, exploración de datos complejos",
            characteristics: "Preserva relaciones locales, técnica no lineal, estocástica",
            pros: ["Excelente para visualización", "Preserva estructura local", "Maneja relaciones no lineales"],
            cons: ["Solo para visualización", "Computacionalmente costoso", "No determinístico"],
            parameters: ["perplexity", "learning_rate", "n_iter", "random_state"],
            example: "Visualizar clusters en datos de expresión genética",
          },
          {
            name: "UMAP",
            type: "Caja Negra",
            use: "Visualización, preprocesamiento, preservación de estructura global y local",
            characteristics: "Preserva estructura local y global, más rápido que t-SNE",
            pros: ["Preserva estructura global", "Más rápido que t-SNE", "Mejor para datasets grandes"],
            cons: ["Menos interpretable que PCA", "Parámetros requieren tuning"],
            parameters: ["n_neighbors", "min_dist", "n_components", "metric"],
            example: "Reducir dimensionalidad de embeddings de texto para clustering",
          },
        ],
        metrics: [
          "Varianza Explicada: [0, 1] - Proporción de información preservada",
          "Error de Reconstrucción: [0, ∞) - Pérdida de información",
          "Stress: Medida de distorsión en la representación",
          "Trustworthiness: Preservación de vecindarios locales",
        ],
      },
      {
        name: "3. Reglas de Asociación",
        description: "Identificar relaciones frecuentes entre variables o elementos",
        algorithms: [
          {
            name: "Apriori",
            type: "Caja Blanca",
            use: "Market basket analysis, recomendaciones, análisis de patrones",
            characteristics: "Encuentra conjuntos frecuentes, genera reglas interpretables",
            pros: ["Completamente interpretable", "Encuentra todas las reglas", "Fácil de entender"],
            cons: ["Computacionalmente costoso", "Genera muchas reglas", "Requiere datos categóricos"],
            parameters: ["min_support", "min_confidence", "min_lift"],
            example: "Encontrar productos que se compran juntos en supermercado",
          },
        ],
        metrics: [
          "Soporte: [0, 1] - Frecuencia del conjunto de elementos",
          "Confianza: [0, 1] - Probabilidad condicional P(B|A)",
          "Lift: [0, ∞) - Mejora sobre probabilidad base (>1 positiva, <1 negativa)",
          "Leverage: Diferencia entre frecuencia observada y esperada",
          "Conviction: Medida de implicación de la regla",
        ],
      },
    ],
    conditions: [
      "✅ Datos sin etiquetar disponibles",
      "🔍 Objetivo de exploración/descubrimiento de patrones",
      "📉 Necesidad de reducir complejidad dimensional",
      "👥 Segmentación de usuarios/productos/comportamientos",
      "🔎 Detección de patrones ocultos o anomalías",
      "📊 Visualización de datos de alta dimensión",
      "🛒 Análisis de cestas de mercado o recomendaciones",
    ],
    workflow: {
      title: "Flujo de Trabajo ML No Supervisado",
      steps: [
        "1. Análisis Exploratorio → Entender distribuciones y correlaciones",
        "2. Preprocesamiento → Normalización, manejo de outliers",
        "3. Selección de Técnica → Clustering, reducción o reglas",
        "4. Selección de Algoritmo → Basado en tipo de datos y objetivo",
        "5. Tuning de Parámetros → Optimizar hiperparámetros específicos",
        "6. Evaluación → Métricas internas y validación de negocio",
        "7. Interpretación → Análisis de resultados y insights",
        "8. Validación → Confirmar hallazgos con expertos del dominio",
      ],
    },
  },
  metrics: {
    title: "Métricas de Evaluación",
    icon: BarChart3,
    color: "bg-purple-500",
    keyPoints: [
      "Métricas específicas para evaluar algoritmos no supervisados de forma objetiva",
      "Diferentes rangos e interpretaciones según la técnica aplicada",
      "Coeficiente de Silueta: métrica principal y más robusta para clustering",
      "Varianza Explicada: fundamental para determinar componentes en PCA",
      "Soporte, Confianza y Lift: trío esencial en reglas de asociación",
      "Combinación de métricas internas y validación externa necesaria",
    ],
    categories: [
      {
        name: "Métricas de Clustering",
        description: "Evalúan la calidad de agrupaciones sin conocer etiquetas verdaderas",
        metrics: [
          {
            name: "Coeficiente de Silueta",
            formula: "s(i) = (b(i) - a(i)) / max(a(i), b(i))",
            range: "[-1, 1]",
            interpretation:
              "Cercano a 1: excelente asignación, cercano a 0: clusters solapados, cercano a -1: mala asignación",
            use: "Evaluar calidad general de clustering, comparar diferentes k",
            pros: ["Fácil de interpretar", "Robusto a outliers", "Funciona con cualquier métrica de distancia"],
            cons: ["Favorece clusters esféricos", "Computacionalmente costoso para datasets grandes"],
            when_to_use: "Siempre como métrica principal de clustering",
          },
          {
            name: "Índice Calinski-Harabasz",
            formula: "CH = (SSB/(k-1)) / (SSW/(n-k))",
            range: "[0, ∞)",
            interpretation: "Valores más altos indican mejor clustering (mayor separación entre clusters)",
            use: "Comparar diferentes números de clusters, seleccionar k óptimo",
            pros: ["Rápido de calcular", "Bueno para clusters esféricos", "Penaliza clusters muy pequeños"],
            cons: ["Asume clusters esféricos", "Sensible a outliers"],
            when_to_use: "Cuando se necesita comparar múltiples valores de k rápidamente",
          },
          {
            name: "Índice Davies-Bouldin",
            formula: "DB = (1/k) Σ max((σi + σj)/d(ci,cj))",
            range: "[0, ∞)",
            interpretation: "Valores más bajos indican mejor clustering (clusters más compactos y separados)",
            use: "Evaluar compacidad intra-cluster y separación inter-cluster",
            pros: ["Considera tanto compacidad como separación", "Fácil de interpretar"],
            cons: ["Favorece clusters esféricos", "Sensible a outliers"],
            when_to_use: "Para validar que clusters son compactos y bien separados",
          },
          {
            name: "Inercia (Within-Cluster Sum of Squares)",
            formula: "WCSS = Σ Σ ||xi - cj||²",
            range: "[0, ∞)",
            interpretation: "Menor inercia indica clusters más compactos",
            use: "Método del codo para determinar k óptimo en K-Means",
            pros: ["Específico para K-Means", "Fácil de calcular", "Intuitivo"],
            cons: ["Solo para K-Means", "Siempre decrece con más clusters"],
            when_to_use: "Exclusivamente con K-Means para encontrar k óptimo",
          },
        ],
        external_metrics: [
          "Adjusted Rand Index (ARI): Corrige por concordancia aleatoria",
          "Normalized Mutual Information (NMI): Mide información compartida",
          "Homogeneidad: Cada cluster contiene solo miembros de una clase",
          "Completitud: Todos miembros de una clase están en el mismo cluster",
          "V-measure: Media armónica de homogeneidad y completitud",
        ],
      },
      {
        name: "Métricas de Reducción de Dimensionalidad",
        description: "Evalúan cuánta información se preserva al reducir dimensiones",
        metrics: [
          {
            name: "Varianza Explicada",
            formula: "VE = Σλi / Σλtotal",
            range: "[0, 1] o [0%, 100%]",
            interpretation: "Proporción de varianza total preservada por los componentes seleccionados",
            use: "Determinar número óptimo de componentes en PCA",
            pros: ["Directamente interpretable", "Estándar en PCA", "Fácil de calcular"],
            cons: ["Solo aplicable a PCA", "No considera estructura no lineal"],
            when_to_use: "Siempre en PCA para seleccionar número de componentes",
            typical_values: "85-95% para buena preservación de información",
          },
          {
            name: "Error de Reconstrucción",
            formula: "RE = ||X - X̂||²",
            range: "[0, ∞)",
            interpretation: "Menor error indica mejor preservación de información original",
            use: "Evaluar pérdida de información en cualquier técnica de reducción",
            pros: ["Aplicable a cualquier técnica", "Medida directa de pérdida"],
            cons: ["Puede ser engañoso con ruido", "No considera estructura semántica"],
            when_to_use: "Para comparar diferentes técnicas de reducción",
          },
          {
            name: "Stress (para MDS)",
            formula: "Stress = √(Σ(dij - d̂ij)² / Σdij²)",
            range: "[0, 1]",
            interpretation: "Medida de distorsión en la representación de distancias",
            use: "Evaluar calidad de representación en escalamiento multidimensional",
            pros: ["Específico para preservación de distancias", "Bien establecido"],
            cons: ["Solo para MDS", "Difícil de interpretar"],
            when_to_use: "Exclusivamente con técnicas basadas en distancias",
          },
          {
            name: "Trustworthiness",
            formula: "Compleja - basada en preservación de k-vecinos",
            range: "[0, 1]",
            interpretation: "Mide qué tan bien se preservan los vecindarios locales",
            use: "Evaluar preservación de estructura local en t-SNE, UMAP",
            pros: ["Evalúa estructura local", "Robusto a ruido global"],
            cons: ["Computacionalmente costoso", "Parámetro k a elegir"],
            when_to_use: "Para técnicas de visualización no lineales",
          },
        ],
        guidelines: [
          "PCA: Buscar 85-95% de varianza explicada acumulada",
          "t-SNE: Evaluar visualmente + trustworthiness",
          "UMAP: Combinar métricas cuantitativas con validación visual",
          "Siempre validar resultados con conocimiento del dominio",
        ],
      },
      {
        name: "Métricas de Reglas de Asociación",
        description: "Evalúan la fuerza y relevancia de relaciones entre elementos",
        metrics: [
          {
            name: "Soporte (Support)",
            formula: "Support(A) = |A| / |D|",
            range: "[0, 1]",
            interpretation: "Frecuencia relativa del conjunto de elementos en el dataset",
            use: "Filtrar conjuntos poco frecuentes, establecer umbral mínimo",
            pros: ["Fácil de interpretar", "Elimina reglas raras", "Computacionalmente simple"],
            cons: ["No mide fuerza de asociación", "Puede eliminar reglas interesantes"],
            when_to_use: "Como filtro inicial para reducir espacio de búsqueda",
            typical_values: "0.01-0.1 (1-10%) dependiendo del dominio",
          },
          {
            name: "Confianza (Confidence)",
            formula: "Confidence(A→B) = Support(A∪B) / Support(A)",
            range: "[0, 1]",
            interpretation: "Probabilidad condicional P(B|A) - fuerza de la regla",
            use: "Evaluar qué tan confiable es la regla A→B",
            pros: ["Interpretable como probabilidad", "Mide fuerza directa"],
            cons: ["No considera frecuencia base de B", "Puede ser engañosa"],
            when_to_use: "Para evaluar fuerza de reglas específicas",
            typical_values: "0.5-0.9 (50-90%) para reglas útiles",
          },
          {
            name: "Lift",
            formula: "Lift(A→B) = Confidence(A→B) / Support(B)",
            range: "[0, ∞)",
            interpretation: ">1: asociación positiva, =1: independencia, <1: asociación negativa",
            use: "Medir mejora sobre probabilidad base, detectar asociaciones reales",
            pros: ["Corrige por frecuencia base", "Detecta asociaciones verdaderas"],
            cons: ["Puede ser inestable con soporte bajo", "Simétrico"],
            when_to_use: "Siempre para validar que la asociación es real",
            typical_values: ">1.2 para asociaciones interesantes",
          },
          {
            name: "Leverage",
            formula: "Leverage(A→B) = Support(A∪B) - Support(A)×Support(B)",
            range: "[-0.25, 0.25]",
            interpretation: "Diferencia entre frecuencia observada y esperada si fueran independientes",
            use: "Medir fuerza de asociación considerando independencia",
            pros: ["Considera independencia", "Rango fijo", "Simétrico"],
            cons: ["Menos intuitivo que lift", "Rango pequeño"],
            when_to_use: "Para comparar reglas con diferentes soportes",
          },
          {
            name: "Conviction",
            formula: "Conviction(A→B) = (1-Support(B)) / (1-Confidence(A→B))",
            range: "[0.5, ∞)",
            interpretation: "Mide qué tan fuerte es la implicación A→B",
            use: "Evaluar fuerza de implicación direccional",
            pros: ["Direccional", "Sensible a reglas fuertes", "Infinito para reglas perfectas"],
            cons: ["Asimétrico", "Inestable con confianza alta", "Menos usado"],
            when_to_use: "Para reglas con alta confianza donde se necesita discriminar",
          },
        ],
        interpretation_guide: [
          "Soporte alto + Confianza alta + Lift > 1 = Regla fuerte y frecuente",
          "Soporte bajo + Confianza alta + Lift alto = Regla rara pero interesante",
          "Lift ≈ 1 = No hay asociación real (independencia)",
          "Lift < 1 = Asociación negativa (uno inhibe al otro)",
        ],
        practical_thresholds: [
          "Soporte mínimo: 0.01-0.05 (1-5%)",
          "Confianza mínima: 0.5-0.8 (50-80%)",
          "Lift mínimo: 1.2-2.0",
          "Ajustar según tamaño del dataset y dominio",
        ],
      },
    ],
    comparison_table: {
      title: "Comparación de Métricas por Técnica",
      data: [
        {
          technique: "K-Means",
          primary_metric: "Coeficiente de Silueta",
          secondary_metrics: ["Inercia", "Calinski-Harabasz"],
          when_to_use: "Clusters esféricos, k conocido aproximadamente",
        },
        {
          technique: "DBSCAN",
          primary_metric: "Coeficiente de Silueta",
          secondary_metrics: ["Davies-Bouldin", "Número de clusters encontrados"],
          when_to_use: "Clusters arbitrarios, detección de outliers",
        },
        {
          technique: "PCA",
          primary_metric: "Varianza Explicada",
          secondary_metrics: ["Error de Reconstrucción", "Scree plot"],
          when_to_use: "Reducción lineal, interpretabilidad",
        },
        {
          technique: "t-SNE",
          primary_metric: "Validación Visual",
          secondary_metrics: ["Trustworthiness", "Stress"],
          when_to_use: "Visualización, exploración de datos",
        },
        {
          technique: "Reglas de Asociación",
          primary_metric: "Lift",
          secondary_metrics: ["Soporte", "Confianza"],
          when_to_use: "Market basket, recomendaciones",
        },
      ],
    },
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
          <h1 className="text-3xl font-bold text-gray-900">Resúmenes ML Completos</h1>
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

                {/* Organizador Gráfico - Flujo de Fases */}
                <Card className="mb-6 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">🔄 Flujo de las 10 Fases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {summaryData.supervised.phases.map((phase, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="text-xs font-medium text-blue-800">{phase.phase.split(". ")[1]}</div>
                          {index < summaryData.supervised.phases.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-blue-400 mx-auto mt-2 hidden md:block" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Fases Detalladas */}
                <div className="grid gap-6">
                  {summaryData.supervised.phases.map((phase, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg text-blue-700">{phase.phase}</CardTitle>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {phase.key}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        {/* Detalles */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">📝 Actividades Clave:</h4>
                          <ul className="space-y-1 text-sm">
                            {phase.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Ejemplos */}
                        {phase.examples && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">💡 Ejemplos:</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                              {phase.examples.map((example, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-500 mt-1">→</span>
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Herramientas */}
                        {phase.tools && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">🛠️ Herramientas:</h4>
                            <div className="flex flex-wrap gap-2">
                              {phase.tools.map((tool, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Ejemplo de Pipeline */}
                <Card className="mt-6 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">
                      {summaryData.supervised.pipeline_example.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{summaryData.supervised.pipeline_example.code}</code>
                    </pre>
                  </CardContent>
                </Card>
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

                {/* Flujo de Trabajo */}
                <Card className="mb-6 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">{summaryData.unsupervised.workflow.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {summaryData.unsupervised.workflow.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="text-sm text-green-800">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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

                {/* Técnicas Detalladas */}
                <div className="space-y-6">
                  {summaryData.unsupervised.techniques.map((technique, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-700">{technique.name}</CardTitle>
                        <p className="text-gray-600">{technique.description}</p>
                      </CardHeader>
                      <CardContent>
                        {/* Algoritmos */}
                        <div className="space-y-4">
                          {technique.algorithms.map((algorithm, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-lg">{algorithm.name}</h4>
                                <Badge variant={algorithm.type === "Caja Blanca" ? "default" : "secondary"}>
                                  {algorithm.type}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">{algorithm.characteristics}</p>

                              <div className="grid md:grid-cols-2 gap-4 mb-3">
                                {/* Pros */}
                                <div>
                                  <h5 className="font-medium text-green-700 mb-2">✅ Ventajas:</h5>
                                  <ul className="text-xs space-y-1">
                                    {algorithm.pros.map((pro, j) => (
                                      <li key={j} className="flex items-start gap-1">
                                        <span className="text-green-500">•</span>
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Cons */}
                                <div>
                                  <h5 className="font-medium text-red-700 mb-2">❌ Desventajas:</h5>
                                  <ul className="text-xs space-y-1">
                                    {algorithm.cons.map((con, j) => (
                                      <li key={j} className="flex items-start gap-1">
                                        <span className="text-red-500">•</span>
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Parámetros */}
                              {algorithm.parameters && (
                                <div className="mb-3">
                                  <h5 className="font-medium text-blue-700 mb-2">⚙️ Parámetros Clave:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {algorithm.parameters.map((param, j) => (
                                      <Badge key={j} variant="outline" className="text-xs">
                                        {param}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium text-purple-700">💼 Uso típico:</span>
                                <span className="text-gray-600">{algorithm.use}</span>
                              </div>

                              <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                                <span className="font-medium text-blue-700">📝 Ejemplo:</span>
                                <span className="text-blue-600 ml-2">{algorithm.example}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Métricas */}
                        {technique.metrics && (
                          <div className="mt-4 p-3 bg-purple-50 rounded">
                            <h4 className="font-semibold text-purple-700 mb-2">📊 Métricas de Evaluación:</h4>
                            <ul className="text-sm space-y-1">
                              {technique.metrics.map((metric, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-purple-500">•</span>
                                  {metric}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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

                {/* Tabla de Comparación */}
                <Card className="mb-6 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-700">
                      {summaryData.metrics.comparison_table.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-purple-200">
                            <th className="text-left p-2 font-semibold text-purple-800">Técnica</th>
                            <th className="text-left p-2 font-semibold text-purple-800">Métrica Principal</th>
                            <th className="text-left p-2 font-semibold text-purple-800">Métricas Secundarias</th>
                            <th className="text-left p-2 font-semibold text-purple-800">Cuándo Usar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {summaryData.metrics.comparison_table.data.map((row, index) => (
                            <tr key={index} className="border-b border-purple-100">
                              <td className="p-2 font-medium">{row.technique}</td>
                              <td className="p-2 text-purple-700">{row.primary_metric}</td>
                              <td className="p-2 text-gray-600">{row.secondary_metrics.join(", ")}</td>
                              <td className="p-2 text-gray-600">{row.when_to_use}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Categorías de Métricas */}
                <div className="space-y-6">
                  {summaryData.metrics.categories.map((category, index) => (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-700">{category.name}</CardTitle>
                        <p className="text-gray-600">{category.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {category.metrics.map((metric, i) => (
                            <div key={i} className="bg-purple-50 p-4 rounded-lg">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-purple-800 mb-3">{metric.name}</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium text-purple-700">📐 Fórmula:</span>
                                      <code className="ml-2 bg-white px-2 py-1 rounded text-xs block mt-1">
                                        {metric.formula}
                                      </code>
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-700">📊 Rango:</span>
                                      <span className="ml-2 font-mono text-purple-600">{metric.range}</span>
                                    </div>
                                    {metric.typical_values && (
                                      <div>
                                        <span className="font-medium text-purple-700">🎯 Valores típicos:</span>
                                        <span className="ml-2 text-gray-600">{metric.typical_values}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <div className="space-y-3 text-sm">
                                    <div>
                                      <span className="font-medium text-purple-700">💡 Interpretación:</span>
                                      <p className="text-gray-600 mt-1">{metric.interpretation}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-700">🎯 Uso:</span>
                                      <p className="text-gray-600 mt-1">{metric.use}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium text-purple-700">⏰ Cuándo usar:</span>
                                      <p className="text-gray-600 mt-1">{metric.when_to_use}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Pros y Cons */}
                              {metric.pros && (
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                  <div>
                                    <h5 className="font-medium text-green-700 mb-2">✅ Ventajas:</h5>
                                    <ul className="text-xs space-y-1">
                                      {metric.pros.map((pro, j) => (
                                        <li key={j} className="flex items-start gap-1">
                                          <span className="text-green-500">•</span>
                                          {pro}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-red-700 mb-2">❌ Limitaciones:</h5>
                                    <ul className="text-xs space-y-1">
                                      {metric.cons.map((con, j) => (
                                        <li key={j} className="flex items-start gap-1">
                                          <span className="text-red-500">•</span>
                                          {con}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Guías adicionales */}
                        {category.external_metrics && (
                          <div className="mt-4 p-3 bg-blue-50 rounded">
                            <h4 className="font-semibold text-blue-700 mb-2">
                              🔗 Métricas Externas (requieren etiquetas verdaderas):
                            </h4>
                            <ul className="text-sm space-y-1">
                              {category.external_metrics.map((metric, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  {metric}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {category.guidelines && (
                          <div className="mt-4 p-3 bg-green-50 rounded">
                            <h4 className="font-semibold text-green-700 mb-2">📋 Guías Prácticas:</h4>
                            <ul className="text-sm space-y-1">
                              {category.guidelines.map((guide, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-green-500">•</span>
                                  {guide}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {category.interpretation_guide && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded">
                            <h4 className="font-semibold text-yellow-700 mb-2">🧭 Guía de Interpretación:</h4>
                            <ul className="text-sm space-y-1">
                              {category.interpretation_guide.map((guide, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-yellow-500">•</span>
                                  {guide}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {category.practical_thresholds && (
                          <div className="mt-4 p-3 bg-orange-50 rounded">
                            <h4 className="font-semibold text-orange-700 mb-2">🎯 Umbrales Prácticos:</h4>
                            <ul className="text-sm space-y-1">
                              {category.practical_thresholds.map((threshold, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-orange-500">•</span>
                                  {threshold}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
              Referencia Rápida Completa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">ML Supervisado</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 10 fases sistemáticas obligatorias</li>
                  <li>• Datos etiquetados requeridos</li>
                  <li>• 70-80% entrenamiento, 20-30% prueba</li>
                  <li>• Pipelines para reproducibilidad</li>
                  <li>• Validación cruzada k-fold</li>
                  <li>• MLOps para producción</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">ML No Supervisado</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Sin datos etiquetados</li>
                  <li>• 3 técnicas: Clustering, Reducción, Reglas</li>
                  <li>• Evaluación más subjetiva</li>
                  <li>• Caja blanca vs caja negra</li>
                  <li>• Preprocesamiento crítico</li>
                  <li>• Validación con expertos del dominio</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Métricas Clave</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Silueta [-1,1] para clustering</li>
                  <li>• Varianza [0,1] para reducción</li>
                  <li>• Soporte/Confianza/Lift para reglas</li>
                  <li>• Combinación de métricas necesaria</li>
                  <li>• Interpretación contextual</li>
                  <li>• Validación externa recomendada</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
