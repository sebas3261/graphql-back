import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Student {
    id: ID!
    name: String
    email: String
    age: Int
  }

  type Cat {
    id: ID!
    url: String!
    width: Int
    height: Int
  }

  type Query {
    students: [Student]
    randomCatImages(limit: Int): [Cat]
    breedCatImages(breedId: String!, limit: Int): [Cat]
  }
`;

