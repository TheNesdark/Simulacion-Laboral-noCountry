"use client";
import { MedicalExam, MedicalExamFilter } from "@/types";

interface MedicalExamsListProps {
  filter: MedicalExamFilter;
  setFilter: React.Dispatch<React.SetStateAction<MedicalExamFilter>>;
  filteredExams: MedicalExam[];
  disponiblesCount: number;
  pendientesCount: number;
}

export default function MedicalExamsList({
  filter,
  setFilter,
  filteredExams,
  disponiblesCount,
  pendientesCount,
}: MedicalExamsListProps) {
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
