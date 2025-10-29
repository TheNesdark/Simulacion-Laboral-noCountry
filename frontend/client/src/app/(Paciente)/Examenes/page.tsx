'use client';

import '@styles/pages/Examenes.css';
import MedicalExamsFilter from './components/MedicalExamsFilter';
import MedicalExamsList from './components/MedicalExamsList';
import useMedicalExams from '@hooks/useMedicalExams';
import LoadingSpinner from '@components/common/LoadingSpinner';
import ErrorMessage from '@components/common/ErrorMessage';

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
      <MedicalExamsFilter
        filter={filter}
        setFilter={setFilter}
        disponiblesCount={disponiblesCount}
        pendientesCount={pendientesCount}
      />
      <MedicalExamsList filteredExams={filteredExams} />
    </>
  );
}
