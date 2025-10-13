package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Disponibilidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisponibilidadRepository extends JpaRepository<Long, Disponibilidad> {
}
