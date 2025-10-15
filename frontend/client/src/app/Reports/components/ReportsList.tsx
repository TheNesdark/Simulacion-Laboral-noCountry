"use client";

import useReports from "@/hook/useReports";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
export default function ReportsList() {
  const { filter, setFilter, filteredReports, disponiblesCount, pendientesCount, isLoading, error } = useReports();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <div className="filter" role="tablist" aria-label="Reportes">
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
      <section className="reports-list">
        {filteredReports.map((report) => (
          <article key={report.id}>
              <h2>{report.title}</h2>
              <time dateTime={report.date}>
                { report.date }  -  { report.doctor }
              </time>
              <div className="report-actions">
                <button className="view-button">
                  Ver Detalles
                </button>
                <button className="download-button">
                  Descargar
                </button>
              </div>
          </article>
        ))}
      </section>
    </>
  );
}