package com.salud.portalcitas.util.client;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventAttendee;
import com.google.api.services.calendar.model.EventDateTime;
import com.salud.portalcitas.entity.Cita;
import com.salud.portalcitas.entity.Cupo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService{

    private final Calendar googleCalendar;

    @Value("${google.calendar.clinic-calendar-id}")
    private String calendarId;


    @Override
    public String crearEvento(Cita cita) {
        Event event = buildEvent(cita);

        try {
            Event created = googleCalendar.events()
                    .insert(calendarId, event)
                    .setSendUpdates("all") // notifica a los asistentes por email
                    .execute();
            return created.getId();
        } catch (IOException e) {
            throw new RuntimeException("Error al crear el evento en Google Calendar", e);
        }
    }

    @Override
    public void actualizarEvento(Cita cita) {
        try {
            Event event = buildEvent(cita);
            googleCalendar.events()
                    .update(calendarId, cita.getGoogleEventId(), event)
                    .setSendUpdates("all")
                    .execute();
        } catch (IOException e) {
            throw new RuntimeException("Error al actualizar el evento en Google Calendar", e);
        }
    }

    @Override
    public void eliminarEvento(String eventId) {
        try {
            googleCalendar.events()
                    .delete(calendarId, eventId)
                    .setSendUpdates("all")
                    .execute();
        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar el evento en Google Calendar", e);
        }
    }

    private Event buildEvent(Cita cita) {
        Cupo cupo = cita.getCupo();

        Event event = new Event();
        event.setSummary("Consulta con Dr. " + cita.getMedico().getApellido());
        event.setDescription("Paciente: " + cita.getPaciente().getNombre() +
                "\nTipo: " + cita.getTipo());

        LocalDateTime inicio = LocalDateTime.of(cupo.getFecha(), cupo.getHoraInicio());
        LocalDateTime fin = LocalDateTime.of(cupo.getFecha(), cupo.getHoraFin());

        // Convertir a formato ISO 8601 correcto para Google Calendar
        // Usar zona horaria de Colombia (America/Bogota)
        String inicioISO = inicio.toString() + ":00";
        String finISO = fin.toString() + ":00";

        event.setStart(new EventDateTime()
                .setDateTime(new DateTime(inicioISO))
                .setTimeZone("America/Bogota"));

        event.setEnd(new EventDateTime()
                .setDateTime(new DateTime(finISO))
                .setTimeZone("America/Bogota"));

        return event;
    }
}
