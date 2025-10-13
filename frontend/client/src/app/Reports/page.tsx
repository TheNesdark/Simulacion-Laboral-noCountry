"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import ReportsList from "./components/ReportsList";
import { reports } from "@/data/reports.json";
import "@/styles/pages/Reports.css";

export default function Reports() {
  const [filter, setFilter] = useState<"Disponibles" | "Pendientes">(
    "Disponibles"
  );


  const filteredReports = reports.filter((report) => report.status === filter);

  return (
    <>
      <Header />
        <main className="reports">
          <div className="filter" role="tablist" aria-label="Reportes">
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
          <h1>{filter}</h1>
          <ReportsList reports={filteredReports} />
        </main>
      <NavBar />
    </>
  );
}