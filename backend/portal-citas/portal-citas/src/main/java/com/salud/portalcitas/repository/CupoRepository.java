package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Cupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface CupoRepository extends JpaRepository<Cupo, Long> {

    boolean existsByDisponibilidadIdAndFechaAndHoraInicio(Long disponibilidadId, LocalDate fecha, LocalTime horaInicio);

    @Query("select c from Cupo c where c.disponibilidad.medico.id = :medicoId and c.fecha = :fecha and c.reservado = false")
    List<Cupo> findAvailableByMedicoAndFecha(Long medicoId, LocalDate fecha);
}
