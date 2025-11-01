package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Cita;
import com.salud.portalcitas.util.enums.EstadoCita;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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

    @EntityGraph(attributePaths = {"paciente", "medico", "medico.clinica", "cupo", "cupo.disponibilidad"})
    @Query("SELECT c FROM Cita c WHERE c.id = :id")
    Optional<Cita> findByIdWithRelations(Long id);

    @EntityGraph(attributePaths = {"paciente", "medico", "medico.clinica", "cupo", "cupo.disponibilidad"})
    @Query("SELECT c FROM Cita c WHERE c.paciente.id = :pacienteId AND c.cupo.fecha = :fecha AND c.estado != 'CANCELADA'")
    List<Cita> findByPacienteIdAndFecha(Long pacienteId, LocalDate fecha);

    @EntityGraph(attributePaths = {"paciente", "medico", "medico.clinica", "cupo", "cupo.disponibilidad"})
    @Query("SELECT c FROM Cita c WHERE c.medico.id = :medicoId AND c.cupo.fecha = :fecha AND c.estado != 'CANCELADA'")
    List<Cita> findByMedicoIdAndFecha(Long medicoId, LocalDate fecha);
}
