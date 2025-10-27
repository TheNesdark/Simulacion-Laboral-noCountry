package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Cita;
import com.salud.portalcitas.util.enums.EstadoCita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    List<Cita> findByPacienteId(Long pacienteId);

    List<Cita> findByMedicoId(Long medicoId);

    //boolean existsByCupoDisponibilidadId(Long disponibilidadId);

    @Query("""
        SELECT COUNT(c) > 0
        FROM Cita c
        WHERE c.cupo.disponibilidad.id = :disponibilidadId
        AND (
            c.cupo.fecha > :fecha
            OR (c.cupo.fecha = :fecha AND c.cupo.horaInicio >= :hora)
        )
    """)
    boolean existsFutureCitasForDisponibilidad(Long disponibilidadId, LocalDate fecha, LocalTime hora);

    List<Cita> findByCupoFechaAndEstado(LocalDate fecha, EstadoCita estado);
}
