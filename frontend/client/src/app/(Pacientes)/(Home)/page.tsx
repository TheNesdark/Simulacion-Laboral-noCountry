"use client";

import "@styles/pages/Home.css";
import SearchBar from "./components/SearchBar";
import CategoryCards from "./components/CategoryCards";
import AppointmentList from "@/components/ui/AppointmentsList";
import { useQuery } from "@tanstack/react-query";
import { getTodaysAppointments } from "@/api/appointmentsApi";

export default function HomePage() {
  const {
    data: todaysAppointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments", "today"],
    queryFn: getTodaysAppointments,
  });

  return (
    <>
      <SearchBar />
      <CategoryCards />
      <AppointmentList
        title="Turnos Programados para hoy"
        appointments={todaysAppointments || []}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
