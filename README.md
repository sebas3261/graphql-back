# 🧠 GraphQL Backend — Sebastian Sanchez, Santiago Soler, Nicholas Triana

Backend desarrollado con **Node.js**, **TypeScript**, **Express** y **Apollo Server (GraphQL)**.  
Este servidor expone queries para gestionar estudiantes y obtener imágenes de gatos de forma dinámica.

---

## 🚀 Tecnologías principales

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js** | Entorno de ejecución JavaScript |
| **TypeScript** | Tipado estático para mayor robustez |
| **Express.js** | Framework HTTP minimalista |
| **Apollo Server** | Implementación de servidor GraphQL |
| **GraphQL** | Lenguaje de consultas flexible |
| **Cat API** | API externa usada para imágenes de gatos |
| **Firebase** | Base de datos para los estudiantes |

---

## 📚 Schema GraphQL

```graphql
type Query {
  # Estudiantes
  students: [Student!]!

  # Información de razas
  catBreed(id: ID!): CatBreed

  # Imágenes aleatorias de gatos
  randomCatImages(limit: Int = 1): [CatImage!]!

  # Imágenes por raza
  breedCatImages(breedId: ID!, limit: Int = 1): [CatImage!]!
}

type Student {
  id: ID!
  name: String!
  email: String!
  age: Int!
}

type CatImage {
  id: ID!
  url: String!
  width: Int!
  height: Int!
}
