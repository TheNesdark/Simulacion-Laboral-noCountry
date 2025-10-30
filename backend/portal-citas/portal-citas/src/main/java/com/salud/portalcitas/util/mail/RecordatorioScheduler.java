package com.salud.portalcitas.util.mail;

import com.salud.portalcitas.entity.Cita;
import com.salud.portalcitas.repository.CitaRepository;
import com.salud.portalcitas.util.enums.EstadoCita;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordatorioScheduler {

    private final CitaRepository citaRepository;
    private final EmailService emailService;


    @Scheduled(cron = "0 0 9 * * *") // Todos los días a las 9:00 AM
    public void enviarRecordatorios() {
        LocalDate manana = LocalDate.now().plusDays(1);

        List<Cita> citas = citaRepository.findByCupoFechaAndEstado(
                manana,
                EstadoCita.PROGRAMADA
        );

        citas.forEach(emailService::enviarRecordatorioCita);
    }
}
