package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Long> {

    List<Disponibilidad> findByMedicoIdAndDiaSemanaAndEliminadaFalse(Long medicoId, Integer diaSemana);

    List<Disponibilidad> findByMedicoIdAndEliminadaFalse(Long medicoId);

    @Query("select d from Disponibilidad d where d.id = :id and d.eliminada = false")
    Disponibilidad findActiveById(Long id);

}
