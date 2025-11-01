import { CatRepository } from "../../domain/ports/CatRepository";
import { Cat } from "../../domain/entities/Cat";

export class GetCatImages {
  constructor(private repo: CatRepository) {}
  async execute(breedId: string, limit: number = 1): Promise<Cat[]> {
    return this.repo.getByBreed(breedId, limit);
  }
}
