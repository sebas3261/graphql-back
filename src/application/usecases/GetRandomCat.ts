import { CatRepository } from "../../domain/ports/CatRepository";
import { Cat } from "../../domain/entities/Cat";

export class GetRandomCat {
  constructor(private repo: CatRepository) {}
  async execute(limit: number = 1): Promise<Cat[]> {
    return this.repo.getRandom(limit);
  }
}
