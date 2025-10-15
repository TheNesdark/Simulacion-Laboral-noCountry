"use client";

import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import AppointmentList from "@/components/ui/AppointmentsList";
import Calendar from "react-calendar";
import useCalendar from "@/hook/useCalendar";

import "react-calendar/dist/Calendar.css";
import "@/styles/pages/Calendar.css";



export default function CalendarPage() {
 

  const { activeDate, monthAppointments, handleActiveStartDateChange, isDateHasAppointment, isLoading, error } = useCalendar()



  return (
    <>
      <Header />
      <main className="calendar-page">
        <Calendar
          className={"calendar"}
          onActiveStartDateChange={handleActiveStartDateChange}
          tileClassName={isDateHasAppointment}
          onChange={() => {}}
          value={null}
        />
        <section className="month-appointments">
          <h2>
            {activeDate
              .toLocaleString("es-CO", { month: "long", year: "numeric" })
              .toUpperCase()}
          </h2>
          <AppointmentList appointments={monthAppointments} isLoading={isLoading} error={error} />
        </section>
      </main>
      <NavBar />
    </>
  );
}