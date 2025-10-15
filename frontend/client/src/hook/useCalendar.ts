import { useState, useMemo } from "react";
import { OnArgs } from "react-calendar";
import { Appointment } from "@/types/appointments";
import { useQuery } from "@tanstack/react-query";
import { getAllAppointments } from "@/api/appointmentsApi";

interface TileClassNameProps {
  date: Date;
  view: string;
}

export default function useCalendar() {
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  const {
    data: allAppointments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appointments", "all"],
    queryFn: getAllAppointments,
  });

  const monthAppointments = useMemo(() => {
    return allAppointments.filter((appointment) => {
      const appointmentDate = new Date(`${appointment.date}T00:00:00`);
      return (
        appointmentDate.getMonth() === activeDate.getMonth() &&
        appointmentDate.getFullYear() === activeDate.getFullYear()
      );
    });
  }, [activeDate, allAppointments]);

  const handleActiveStartDateChange = ({ activeStartDate }: OnArgs) => {
    setActiveDate(activeStartDate || new Date());
  };

  const isDateHasAppointment = ({ date }: TileClassNameProps) => {
    const dateString: string = date.toISOString().split("T")[0];
    return monthAppointments.find(
      (appointment: Appointment) => appointment.date === dateString,
    )
      ? "appointment-date"
      : null;
  };

  return {
    activeDate,
    monthAppointments,
    handleActiveStartDateChange,
    isDateHasAppointment,
    isLoading,
    error,
  };
}
