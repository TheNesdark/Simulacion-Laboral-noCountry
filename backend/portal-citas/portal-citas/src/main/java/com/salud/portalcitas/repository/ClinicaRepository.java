package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Clinica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClinicaRepository extends JpaRepository<Clinica, Long> {
}
