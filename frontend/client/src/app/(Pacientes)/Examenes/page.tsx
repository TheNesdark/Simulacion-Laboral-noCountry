"use client";
import "@styles/pages/Examenes.css";
import MedicalExamsList from "./components/MedicalExamsList";
import useMedicalExams from "@hooks/useMedicalExams";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ErrorMessage from "@components/common/ErrorMessage";

export default function ExamsPage() {
  const {
    filter,
    setFilter,
    filteredExams,
    disponiblesCount,
    pendientesCount,
    isLoading,
    error,
  } = useMedicalExams();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <MedicalExamsList
        filter={filter}
        setFilter={setFilter}
        filteredExams={filteredExams}
        disponiblesCount={disponiblesCount}
        pendientesCount={pendientesCount}
      />
    </>
  );
}
