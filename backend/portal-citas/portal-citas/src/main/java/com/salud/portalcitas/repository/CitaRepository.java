package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Citas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CitaRepository extends JpaRepository<Citas, Long> {

    boolean existsByCupoDisponibilidadId(Long disponibilidadId);

    @Query("select count(c) > 0 from Cita c where c.cupo.disponibilidad.id = :disponibilidadId and c.fechaHoraInicio >= :desde")
    boolean existsFutureCitasForDisponibilidad(Long disponibilidadId, java.time.LocalDateTime desde);

}
