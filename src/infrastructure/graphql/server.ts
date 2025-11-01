import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { buildResolvers } from "./resolver";

import { FirebaseStudentsRepository } from "../repositories/FirebaseStudentsRepository";
import { CatApiImagesRepository } from "../repositories/CatApiImagesRepository";

// Use cases
import { ListStudents } from "../../application/usecases/ListStudents";
import { GetRandomCat } from "../../application/usecases/GetRandomCat";
import { GetCatImages } from "../../application/usecases/GetCatImages";

async function bootstrap() {
  const studentsRepo = new FirebaseStudentsRepository();
  const catImagesRepo = new CatApiImagesRepository();

  const listStudents      = new ListStudents(studentsRepo);
  const getRandomCatImages= new GetRandomCat(catImagesRepo);
  const getBreedCatImages = new GetCatImages(catImagesRepo);

  const resolvers = buildResolvers({
    listStudents,
    getRandomCatImages,
    getBreedCatImages
  });

  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000 }
  });

  console.log(`🚀 GraphQL ready at ${url}`);
}

bootstrap().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});