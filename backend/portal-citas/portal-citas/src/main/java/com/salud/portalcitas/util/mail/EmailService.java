package com.salud.portalcitas.util.mail;

import com.salud.portalcitas.entity.Cita;

public interface EmailService {

    void enviarConfirmacionCita(Cita cita);
    void enviarCancelacionCita(Cita cita);
    void enviarRecordatorioCita(Cita cita);
}
