"use client";

import useMedicalExams from "@/hook/useMedicalExams";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function MedicalExamsList() {
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
      <div className="filter" role="tablist" aria-label="Exámenes Médicos">
        <button
          type="button"
          role="tab"
          aria-selected={filter === "Disponibles"}
          className={filter === "Disponibles" ? "is-active" : ""}
          onClick={() => setFilter("Disponibles")}
        >
          Disponibles ({disponiblesCount})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === "Pendientes"}
          className={filter === "Pendientes" ? "is-active" : ""}
          onClick={() => setFilter("Pendientes")}
        >
          Pendientes ({pendientesCount})
        </button>
      </div>
      <section className="medical-exams-list">
        {filteredExams.map((exam) => (
          <article key={exam.id}>
            <h2>{exam.title}</h2>
            <time dateTime={exam.date}>
              {exam.date} - {exam.doctor}
            </time>
            <div className="exam-actions">
              <button className="view-button">Ver Detalles</button>
              <button className="download-button">Descargar</button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
