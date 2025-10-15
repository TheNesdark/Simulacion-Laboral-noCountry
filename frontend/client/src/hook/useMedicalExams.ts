import { useState } from "react";
import { getAllMedicalExams } from "@/api/medicalExamsApi";
import { MedicalExamFilter } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useMedicalExams() {
  const [filter, setFilter] = useState<MedicalExamFilter>("Disponibles");

  const {
    data: medicalExams = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["medicalExams", "all"],
    queryFn: getAllMedicalExams,
  });

  const disponiblesCount = medicalExams.filter(
    (exam) => exam.status === "Disponibles",
  ).length;

  const pendientesCount = medicalExams.filter(
    (exam) => exam.status === "Pendientes",
  ).length;

  const filteredExams = medicalExams.filter((exam) => exam.status === filter);

  return {
    medicalExams,
    disponiblesCount,
    pendientesCount,
    filteredExams,
    filter,
    setFilter,
    isLoading,
    error,
  };
}
