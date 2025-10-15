import { formatDate } from "@/utils/dateUtils";
import { appointment } from "@/types/appointments";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const backgroundColors = [
    "#F8BBD0",
    "#BBDEFB",
    "#C8E6C9",
    "#FFF9C4",
    "#D1C4E9",
    "#FFE0B2",
];

interface AppointmentsListProps {
    appointments: appointment[];
    isLoading: boolean;
    error: Error | null;
}

export default function AppointmentsList({ appointments, isLoading, error }: AppointmentsListProps) {

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage error={error} />;
    }

    return (
        <>
            <section className="appointments-list">
                {appointments.map((appointment, index) => (
                    <article
                        key={appointment.id}
                        style={{
                            backgroundColor:
                                backgroundColors[index % backgroundColors.length],
                        }}
                    >
                        <div>
                            <h3>{appointment.title}</h3>
                            <p>{appointment.doctor}</p>
                        </div>
                        <time dateTime={`${appointment.date}T${appointment.time}`}>
                            <span>{formatDate(appointment.date)}</span>
                            <span>{appointment.time}</span>
                        </time>
                    </article>
                ))}
            </section>
        </>
    );
}
