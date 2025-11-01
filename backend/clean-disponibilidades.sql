-- Script para limpiar disponibilidades y cupos de la base de datos
-- Base de datos: railway (PostgreSQL)
-- Host: switchyard.proxy.rlwy.net:56517

-- Eliminar todos los cupos
DELETE FROM cupos;

-- Eliminar todas las disponibilidades
DELETE FROM disponibilidades;

-- Verificar que se eliminaron
SELECT COUNT(*) as total_cupos FROM cupos;
SELECT COUNT(*) as total_disponibilidades FROM disponibilidades;

-- Para ejecutar este script:
-- psql -h switchyard.proxy.rlwy.net -p 56517 -U postgres -d railway -f clean-disponibilidades.sql
-- Password: PwFDEphOpcOLYrswKiPVTzJtfvrbmYSR
