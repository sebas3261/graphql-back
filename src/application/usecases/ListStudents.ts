import { StudentsRepository } from "../../domain/ports/StudentsRepository";
import { Student } from "../../domain/entities/Student";

export class ListStudents {
  constructor(private repo: StudentsRepository) {}

  async execute(): Promise<Student[]> {
    return this.repo.findAll();
  }
}
