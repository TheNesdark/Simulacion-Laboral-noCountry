package com.salud.portalcitas.util.mail;

import com.salud.portalcitas.entity.Cita;
import com.salud.portalcitas.repository.CitaRepository;
import com.salud.portalcitas.util.enums.EstadoCita;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecordatorioScheduler {

    private final CitaRepository citaRepository;
    private final EmailService emailService;


    @Scheduled(cron = "0 0 9 * * *") // Todos los días a las 9:00 AM
    public void enviarRecordatorios() {
        LocalDate manana = LocalDate.now().plusDays(1);
        
        log.info("Iniciando envío de recordatorios para citas del día: {}", manana);

        List<Cita> citas = citaRepository.findByCupoFechaAndEstado(
                manana,
                EstadoCita.PROGRAMADA
        );

        log.info("Encontradas {} citas para enviar recordatorio", citas.size());

        citas.forEach(cita -> {
            try {
                emailService.enviarRecordatorioCita(cita);
                log.info("Recordatorio enviado exitosamente para cita ID: {}", cita.getId());
            } catch (Exception e) {
                log.error("Error al enviar recordatorio para cita ID {}: {}", cita.getId(), e.getMessage(), e);
                // Continuar con las demás citas aunque una falle
            }
        });
        
        log.info("Finalizado envío de recordatorios. Total procesadas: {}", citas.size());
    }
}
