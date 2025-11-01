import { Student } from "../entities/Student";

export interface StudentsRepository {
  findAll(): Promise<Student[]>;
}
