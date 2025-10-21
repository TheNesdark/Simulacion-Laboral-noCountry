package com.salud.portalcitas.repository;

import com.salud.portalcitas.entity.Cupo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CupoRepository extends JpaRepository<Cupo, Long> {
}
