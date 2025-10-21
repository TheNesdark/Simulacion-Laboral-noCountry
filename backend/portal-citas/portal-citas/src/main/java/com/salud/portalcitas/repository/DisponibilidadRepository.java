package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisponibilidadRepository extends JpaRepository<Disponibilidad, Long> {

    List<Disponibilidad> findByMedicoId(Long medicoId);

    List<Disponibilidad> findByMedicoIdAndDiaSemana(Long medicoId, int diaSemana);

}
