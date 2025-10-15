"use client";

import "@styles/pages/Home.css";
import Header from "@/components/layout/Header";
import SearchBar from "./components/SearchBar";
import CategoryCards from "./components/CategoryCards";
import AppointmentList from "@/components/ui/AppointmentsList";
import NavBar from "@/components/layout/NavBar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useQuery } from '@tanstack/react-query';
import { getTodaysAppointments } from '@/api/appointmentsApi';

export default function Index() {
  const { data: todaysAppointments, isLoading, error } = useQuery({
    queryKey: ['appointments', 'today'],
    queryFn: getTodaysAppointments,
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <CategoryCards />
        <AppointmentList appointments={todaysAppointments || []} />
      </main>
      <NavBar />
    </>
  );
}
