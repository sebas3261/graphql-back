import { gql } from "graphql-tag";

export const typeDefs = gql`
  type CatBreed {
    id: ID!
    name: String!
    origin: String
    temperament: String
    imageUrl: String
  }

  type Student {
    id: ID!
    name: String!
    email: String
    age: Int
  }

  type CatImage {
    id: ID!
    url: String!
    width: Int
    height: Int
    breedId: String
  }

  type Query {
    catBreed(id: ID!): CatBreed
    students: [Student!]!

    # Nuevas:
    randomCatImages(limit: Int = 1): [CatImage!]!
    breedCatImages(breedId: ID!, limit: Int = 1): [CatImage!]!
  }
`;
