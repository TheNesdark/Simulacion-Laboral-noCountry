export interface MedicalExam {
  id: string;
  title: string;
  date: string;
  doctor: string;
  status: "Disponibles" | "Pendientes";
}

export type MedicalExams = MedicalExam[];

export type MedicalExamFilter = "Disponibles" | "Pendientes";
