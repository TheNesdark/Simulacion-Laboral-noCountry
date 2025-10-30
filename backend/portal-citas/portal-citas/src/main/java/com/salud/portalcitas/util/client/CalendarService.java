package com.salud.portalcitas.util.client;

import com.salud.portalcitas.entity.Cita;

public interface CalendarService {

    String crearEvento(Cita cita);
    void actualizarEvento(Cita cita);
    void eliminarEvento(String eventId);
}
