"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import ReportsList from "./components/ReportsList";
import "@/styles/pages/Reports.css";

export default function Reports() {
  const [filter, setFilter] = useState<"Disponibles" | "Pendientes">(
    "Disponibles"
  );

  const reports = [
    {
      id: "1",
      title: "Análisis de Sangre",
      date: "02/03/25",
      doctor: "Dr. Martín Rivera",
      status: "Disponibles" as const,
    },
    {
      id: "2",
      title: "Prueba de Esfuerzo",
      date: "15/02/25",
      doctor: "Dr. Martín Rivera",
      status: "Pendientes" as const,
    },
    {
      id: "3",
      title: "Radiografía de Tórax",
      date: "22/02/25",
      doctor: "Dr. Martín Rivera",
      status: "Disponibles" as const,
    },
    {
      id: "4",
      title: "Ultrasonido Abdominal",
      date: "05/03/25",
      doctor: "Dr. Martín Rivera",
      status: "Pendientes" as const,
    },
    {
      id: "5",
      title: "Control Prenatal",
      date: "28/02/25",
      doctor: "Dr. Martín Rivera",
      status: "Disponibles" as const,
    },
  ];

  const filteredReports = reports.filter((report) => report.status === filter);

  return (
    <>
      <Header />
      <main className="reports-page">
        <div className="reports-switch" role="tablist" aria-label="Reportes">
          <button
            type="button"
            role="tab"
            aria-selected={filter === "Disponibles"}
            className={filter === "Disponibles" ? "is-active" : ""}
            onClick={() => setFilter("Disponibles")}
          >
            Disponibles
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={filter === "Pendientes"}
            className={filter === "Pendientes" ? "is-active" : ""}
            onClick={() => setFilter("Pendientes")}
          >
            Pendientes
          </button>
        </div>

        <section>
          <h1>{filter}</h1>
          <ReportsList reports={filteredReports} />
        </section>
      </main>
      <NavBar />
    </>
  );
}