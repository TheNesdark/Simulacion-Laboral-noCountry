package com.salud.portalcitas.util.mail;

import com.salud.portalcitas.entity.Cita;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;


    @Override
    public void enviarConfirmacionCita(Cita cita) {
        String subject = "Confirmación de Turno";
        String body = """
                Hola %s,
                
                Tu turno ha sido confirmado para el día %s a las %s.
                
                Médico: %s %s
                Clínica: %s, %s
                
                ¡Gracias!
                """.formatted(
                cita.getPaciente().getNombre(),
                cita.getCupo().getFecha(),
                cita.getCupo().getHoraInicio(),
                cita.getMedico().getNombre(),
                cita.getMedico().getApellido(),
                cita.getMedico().getClinica().getNombre(),
                cita.getMedico().getClinica().getDireccion()
        );
        enviarEmail(cita.getPaciente().getEmail(), subject, body);
    }

    @Override
    public void enviarCancelacionCita(Cita cita) {
        String subject = "Turno Cancelado";
        String body = """
                Hola %s,
                
                Tu turno del día %s a las %s ha sido cancelado.
                
                Motivo: %s
                
                """.formatted(
                cita.getPaciente().getNombre(),
                cita.getCupo().getFecha(),
                cita.getCupo().getHoraInicio(),
                cita.getMotivoCancelacion()
        );
        enviarEmail(cita.getPaciente().getEmail(), subject, body);
    }

    @Override
    public void enviarRecordatorioCita(Cita cita) {
        String subject = "Recordatorio de Turno (24hs)";
        String body = """
                Hola %s,
                
                Te recordamos que mañana tienes un turno con el Dr. %s %s,
                el día %s a las %s.
                
                Clínica %s, %s
                
                ¡Te esperamos!
                """.formatted(
                cita.getPaciente().getNombre(),
                cita.getMedico().getNombre(),
                cita.getMedico().getApellido(),
                cita.getCupo().getFecha(),
                cita.getCupo().getHoraInicio(),
                cita.getMedico().getClinica().getNombre(),
                cita.getMedico().getClinica().getDireccion()
        );
        enviarEmail(cita.getPaciente().getEmail(), subject, body);
    }

    private void enviarEmail(String to, String subject, String body) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setFrom(from);
        mensaje.setTo(to);
        mensaje.setSubject(subject);
        mensaje.setText(body);
        mailSender.send(mensaje);
    }
}
