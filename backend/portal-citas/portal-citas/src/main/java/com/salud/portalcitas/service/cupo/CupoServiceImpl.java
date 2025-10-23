package com.salud.portalcitas.service.cupo;

import com.salud.portalcitas.dto.cupo.CupoResponse;
import com.salud.portalcitas.entity.Cupo;
import com.salud.portalcitas.entity.Disponibilidad;
import com.salud.portalcitas.repository.CupoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CupoServiceImpl implements CupoService{

    private final CupoRepository cupoRepository;


    @Override
    public void generarCuposParaDisponibilidad(Disponibilidad disponibilidad, int diasAdelante) {
        LocalDate hoy = LocalDate.now();
        LocalDate fin = hoy.plusDays(diasAdelante);

        for (LocalDate fecha = hoy; !fecha.isAfter(fin); fecha = fecha.plusDays(1)) {
            if (fecha.getDayOfWeek().getValue() % 7 == disponibilidad.getDiaSemana()) {
                generarCuposParaFecha(disponibilidad, fecha);
            }
        }
    }

    private void generarCuposParaFecha(Disponibilidad d, LocalDate fecha) {
        LocalTime inicio = d.getHoraInicio();
        LocalTime fin = d.getHoraFin();
        int minutos = d.getMinutosCupo();

        LocalTime cursor = inicio;
        while (!cursor.plusMinutes(minutos).isAfter(fin)) {
            LocalTime slotEnd = cursor.plusMinutes(minutos);


            // Verificar si ya existe ese cupo
            boolean exist = cupoRepository.existsByDisponibilidadIdAndFechaAndHoraInicio(d.getId(), fecha, cursor);
            if (!exist) {
                Cupo c = new Cupo();
                c.setDisponibilidad(d);
                c.setFecha(fecha);
                c.setHoraInicio(cursor);
                c.setHoraFin(slotEnd);
                c.setReservado(false);
                cupoRepository.save(c);
            }

            cursor = slotEnd;
        }
    }

    public void eliminarCuposLibresFuturos(Long disponibilidadId) {
        LocalDate desde = LocalDate.now();
        cupoRepository.deleteFreeFutureCupos(disponibilidadId, desde);
    }

    @Override
    public List<CupoResponse> obtenerCuposDisponiblesPorMedicoYFecha(Long medicoId, LocalDate fecha) {
        List<Cupo> cupos = cupoRepository.findAvailableByMedicoAndFecha(medicoId, fecha);
        return cupos.stream()
                .map(c -> new CupoResponse(c.getId(), c.getDisponibilidad().getId(), c.getFecha(), c.getHoraInicio().toString(), c.getHoraFin().toString(), c.getReservado()))
                .toList();
    }
}
