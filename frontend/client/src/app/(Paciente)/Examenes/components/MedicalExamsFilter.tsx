"use client";

import { Dispatch, SetStateAction } from "react";
import { MedicalExamFilter } from "@/types";

interface MedicalExamsFilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<MedicalExamFilter>>;
  pendientesCount: number;
  disponiblesCount: number;
}

export default function MedicalExamsFilter({
  filter,
  setFilter,
  pendientesCount,
  disponiblesCount,
}: MedicalExamsFilterProps) {
  return (
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
  );
}
