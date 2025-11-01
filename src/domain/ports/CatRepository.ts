import { Cat } from "../entities/Cat";

export interface CatRepository {
  getRandom(limit: number): Promise<Cat[]>;
  getByBreed(breedId: string, limit: number): Promise<Cat[]>;
}
