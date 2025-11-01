import { ListStudents } from "../../application/usecases/ListStudents";
import { GetRandomCat } from "../../application/usecases/GetRandomCat";
import { GetCatImages } from "../../application/usecases/GetCatImages";

export function buildResolvers(deps: {
  listStudents: ListStudents;
  getRandomCatImages: GetRandomCat;
  getBreedCatImages: GetCatImages;
}) {
  return {
    Query: {

      students: async () =>
        deps.listStudents.execute(),

      randomCatImages: async (_: unknown, args: { limit?: number }) =>
        deps.getRandomCatImages.execute(args.limit ?? 1),

      breedCatImages: async (_: unknown, args: { breedId: string; limit?: number }) =>
        deps.getBreedCatImages.execute(args.breedId, args.limit ?? 1)
    }
  };
}
