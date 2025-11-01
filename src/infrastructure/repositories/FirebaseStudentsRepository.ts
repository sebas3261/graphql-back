import { StudentsRepository } from "../../domain/ports/StudentsRepository";
import { Student } from "../../domain/entities/Student";
import { getFirestore } from "../firebase/initFirebase";

export class FirebaseStudentsRepository implements StudentsRepository {
  async findAll(): Promise<Student[]> {
    const db = getFirestore();
    const snap = await db.collection("Students").get(); // respeta mayúscula

    return snap.docs.map((d) => {
      const data = d.data() as any;
      const student: Student = {
        id: d.id,
        name: String(data.name ?? ""),
        email: typeof data.email === "string" ? data.email : undefined,
        age: typeof data.age === "number" ? data.age : undefined,
      };
      return student;
    });
  }
}
