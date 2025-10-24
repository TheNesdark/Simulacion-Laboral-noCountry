package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    List<Cita> findByPacienteId(Long pacienteId);

    List<Cita> findByMedicoId(Long medicoId);

    boolean existsByCupoDisponibilidadId(Long disponibilidadId);

    @Query("select count(c) > 0 from Cita c where c.cupo.disponibilidad.id = :disponibilidadId and c.fechaHoraInicio >= :desde")
    boolean existsFutureCitasForDisponibilidad(Long disponibilidadId, java.time.LocalDateTime desde);

}
