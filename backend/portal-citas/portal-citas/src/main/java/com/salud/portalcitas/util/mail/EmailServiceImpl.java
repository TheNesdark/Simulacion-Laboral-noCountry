package com.salud.portalcitas.util.mail;

import com.salud.portalcitas.entity.Cita;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
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
        try {
            if (to == null || to.isEmpty()) {
                log.warn("No se puede enviar email: dirección de correo vacía o nula");
                return;
            }
            
            if (from == null || from.isEmpty()) {
                log.error("No se puede enviar email: 'from' no está configurado en application.properties");
                throw new RuntimeException("Configuración de correo incorrecta: spring.mail.username no está configurado");
            }
            
            log.info("Intentando enviar email de '{}' a: {}", from, to);
            log.debug("Configuración SMTP - Host: smtp.gmail.com, Port: 587, From: {}", from);
            
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setFrom(from);
            mensaje.setTo(to);
            mensaje.setSubject(subject);
            mensaje.setText(body);
            
            mailSender.send(mensaje);
            log.info("Email enviado exitosamente a: {}", to);
            
        } catch (MailException e) {
            String errorMessage = e.getMessage();
            log.error("Error de autenticación/envió al enviar email a {}: {}", to, errorMessage);
            log.error("Causa raíz del error: {}", e.getCause() != null ? e.getCause().getMessage() : "No disponible");
            
            // Proporcionar información más específica sobre errores de autenticación
            if (errorMessage != null && (errorMessage.contains("authentication failed") || 
                                         errorMessage.contains("Authentication") ||
                                         errorMessage.contains("535") ||
                                         errorMessage.contains("534"))) {
                log.error("PROBLEMA DE AUTENTICACIÓN DETECTADO:");
                log.error("1. Verifica que 'spring.mail.username' sea correcto: {}", from);
                log.error("2. Verifica que 'spring.mail.password' sea una contraseña de aplicación de Gmail válida");
                log.error("3. Si usas 2FA en Gmail, debes generar una 'Contraseña de aplicación' desde: https://myaccount.google.com/apppasswords");
                log.error("4. La contraseña de aplicación debe tener exactamente 16 caracteres (puede incluir espacios)");
            }
            
            throw new RuntimeException("Error al enviar email: " + errorMessage, e);
        } catch (Exception e) {
            log.error("Error inesperado al enviar email a {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Error inesperado al enviar email: " + e.getMessage(), e);
        }
    }
}
