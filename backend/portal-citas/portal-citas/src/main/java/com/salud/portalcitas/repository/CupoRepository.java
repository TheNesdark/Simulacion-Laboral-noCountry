package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Cupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CupoRepository extends JpaRepository<Cupo, Long> {

    List<Cupo> findByDisponibilidadIdAndFecha(Long disponibilidadId, LocalDate fecha);

    List<Cupo> findByDisponibilidadIdAndFechaBetween(Long disponibilidadId, LocalDate desde, LocalDate hasta);

    @Query("select c from Cupo c where c.disponibilidad.medico.id = :medicoId and c.fecha = :fecha and c.reservado = false")
    List<Cupo> findAvailableByMedicoAndFecha(Long medicoId, LocalDate fecha);

    boolean existsByDisponibilidadIdAndFechaAndHoraInicio(Long disponibilidadId, LocalDate fecha, java.time.LocalTime horaInicio);

    @Modifying
    @Query("delete from Cupo c where c.disponibilidad.id = :disponibilidadId and c.reservado = false and c.fecha >= :desde")
    void deleteFreeFutureCupos(Long disponibilidadId, LocalDate desde);

    @EntityGraph(attributePaths = {"disponibilidad", "disponibilidad.medico", "disponibilidad.medico.clinica"})
    @Query("SELECT c FROM Cupo c WHERE c.id = :id")
    Optional<Cupo> findByIdWithRelations(Long id);
}
