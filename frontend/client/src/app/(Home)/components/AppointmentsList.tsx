interface Appointment {
  title: string;
  doctor: string;
  date: string;
  time: string;
}

export default function AppointmentsList() {
  const defaultAppointments: Appointment[] = [
    {
      title: "Control pediatria - Virtual",
      doctor: "Dr Fernandez",
      date: "Hoy",
      time: "12:00",
    },
    {
      title: "Control pediatria - Virtual",
      doctor: "Dr Fernandez",
      date: "12/10/2025",
      time: "12:00",
    },
  ];

  const displayAppointments = defaultAppointments;

  // Array de colores para los backgrounds
  const backgroundColors = [
    "#F8BBD0",
    "#BBDEFB",
    "#C8E6C9",
    "#FFF9C4",
    "#D1C4E9",
    "#FFE0B2",
  ];

  return (
    <>
      <section className="appointments-list">
        <h2>Turnos Programados</h2>
        {displayAppointments.map((appointment, index) => (
          <article
            key={index}
            style={{
              backgroundColor:
                backgroundColors[index % backgroundColors.length],
            }}
          >
            <div>
              <h3>{appointment.title}</h3>
              <p>{appointment.doctor}</p>
            </div>
            <time dateTime="2025-10-12T12:00">
              <span>{appointment.date}</span>
              <span>{appointment.time}</span>
            </time>
          </article>
        ))}
      </section>
    </>
  );
}
