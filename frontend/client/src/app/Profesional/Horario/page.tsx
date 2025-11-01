'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDoctorAvailabilities, createAvailability, deleteAvailability, updateAvailability, Disponibilidad } from '@/services/backend/availabilityService';
import '@/styles/pages/Horario.css';

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const HORAS = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

export default function HorarioPage() {
  const { medicoId } = useAuth();
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([]);
  const [diasSeleccionados, setDiasSeleccionados] = useState<number[]>([]);
  const [horaInicio, setHoraInicio] = useState('09:00');
  const [horaFin, setHoraFin] = useState('17:00');
  const [minutosCupo, setMinutosCupo] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (medicoId) {
      cargarDisponibilidades();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicoId]);

  const cargarDisponibilidades = async () => {
    if (!medicoId) return;
    try {
      const data = await getDoctorAvailabilities(medicoId);
      
      // El backend ya filtra las eliminadas con findByMedicoIdAndEliminadaFalse
      // pero por si acaso, filtramos también en el frontend
      const disponibilidadesActivas = data.filter(disp => disp.activo !== false);
      
      setDisponibilidades(disponibilidadesActivas);
      
      // Actualizar días seleccionados basándose en las disponibilidades activas del servidor
      const diasActivos = disponibilidadesActivas.map(d => d.diaSemana);
      setDiasSeleccionados(diasActivos);
      
      if (disponibilidadesActivas.length > 0) {
        const horaIni = disponibilidadesActivas[0].horaInicio.substring(0, 5);
        const horaFn = disponibilidadesActivas[0].horaFin.substring(0, 5);
        setHoraInicio(horaIni);
        setHoraFin(horaFn);
        setMinutosCupo(disponibilidadesActivas[0].minutosCupo);
      }
    } catch (err) {
      setError('Error al cargar disponibilidades');
    }
  };

  const toggleDia = (dia: number) => {
    setDiasSeleccionados(prev => {
      const newDias = prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia];
      return newDias;
    });
  };

  const handleGuardar = async () => {
    if (!medicoId) return;
    setLoading(true);
    setError(null);

    try {
      // Obtener las disponibilidades actuales del servidor para asegurar que tenemos los datos más recientes
      const disponibilidadesActuales = await getDoctorAvailabilities(medicoId);
      
      // Determinar qué disponibilidades eliminar (las que existen pero no están en días seleccionados)
      const diasParaEliminar = disponibilidadesActuales
        .filter(disp => !diasSeleccionados.includes(disp.diaSemana) && disp.id != null)
        .map(disp => disp.id)
        .filter((id): id is number => typeof id === 'number' && !isNaN(id));

      // Determinar qué días crear (los que están seleccionados pero no existen)
      const diasExistentes = disponibilidadesActuales.map(disp => disp.diaSemana);
      const diasParaCrear = diasSeleccionados.filter(dia => !diasExistentes.includes(dia));

      // Determinar qué disponibilidades actualizar (las que existen y están seleccionadas pero pueden tener horarios diferentes)
      // Normalizar horas para comparación (el backend puede devolver "HH:mm:ss" pero usamos "HH:mm")
      const normalizarHora = (hora: string) => hora.substring(0, 5); // Tomar solo "HH:mm"
      const disponibilidadesParaActualizar = disponibilidadesActuales.filter(disp => 
        diasSeleccionados.includes(disp.diaSemana) &&
        (normalizarHora(disp.horaInicio) !== horaInicio || normalizarHora(disp.horaFin) !== horaFin || disp.minutosCupo !== minutosCupo)
      );

      // Eliminar disponibilidades que ya no están seleccionadas
      for (const id of diasParaEliminar) {
        if (!id || isNaN(id)) {
          continue;
        }
        try {
          await deleteAvailability(id);
        } catch (err: any) {
          // Si hay citas futuras, mostrar un mensaje más claro
          if (err.message?.includes('citas futuras') || err.message?.includes('citas asociadas')) {
            setError('No se puede eliminar esta disponibilidad porque tiene citas futuras programadas. Por favor, cancela o completa las citas primero.');
            setLoading(false);
            return;
          }
          throw err;
        }
      }
      
      // Esperar un momento para que el backend procese las eliminaciones
      if (diasParaEliminar.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Actualizar disponibilidades existentes con nuevos horarios
      for (const disp of disponibilidadesParaActualizar) {
        if (!disp.id || isNaN(disp.id)) {
          continue;
        }
        try {
          await updateAvailability(disp.id, {
            diaSemana: disp.diaSemana,
            horaInicio,
            horaFin,
            minutosCupo,
          });
        } catch (err: any) {
          if (err.message?.includes('citas futuras') || err.message?.includes('citas asociadas')) {
            setError('No se puede modificar esta disponibilidad porque tiene citas futuras programadas.');
            setLoading(false);
            return;
          }
          throw err;
        }
      }

      // Crear nuevas disponibilidades para días no existentes
      for (const dia of diasParaCrear) {
        await createAvailability(medicoId, {
          diaSemana: dia,
          horaInicio,
          horaFin,
          minutosCupo,
        });
      }

      // Recargar disponibilidades desde el servidor para sincronizar el estado
      const disponibilidadesActualizadas = await getDoctorAvailabilities(medicoId);
      
      // El backend ya filtra las eliminadas, pero por seguridad también filtramos en frontend
      const disponibilidadesActivas = disponibilidadesActualizadas.filter(disp => disp.activo !== false);
      
      // Actualizar estado con los datos frescos del servidor
      setDisponibilidades(disponibilidadesActivas);
      const diasActivos = disponibilidadesActivas.map(d => d.diaSemana);
      setDiasSeleccionados(diasActivos);
      
      if (disponibilidadesActivas.length > 0) {
        const horaIni = disponibilidadesActivas[0].horaInicio.substring(0, 5);
        const horaFn = disponibilidadesActivas[0].horaFin.substring(0, 5);
        setHoraInicio(horaIni);
        setHoraFin(horaFn);
        setMinutosCupo(disponibilidadesActivas[0].minutosCupo);
      }
      
      alert('Horarios guardados exitosamente');
    } catch (err: any) {
      const errorMessage = err.message || 'Error al guardar horarios';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="horario-page">
      <section className="dias-trabajo">
        <h2>Días de trabajo</h2>
        <div className="dias-grid">
          {DIAS_SEMANA.map((dia, index) => (
            <button
              key={index}
              onClick={() => toggleDia(index)}
              className={diasSeleccionados.includes(index) ? 'dia-activo' : 'dia-inactivo'}
            >
              {dia}
            </button>
          ))}
        </div>
      </section>

      <section className="horarios-trabajo">
        <h2>Horarios de trabajo</h2>
        
        <div className="horario-inputs">
          <div>
            <label>Hora inicio:</label>
            <select value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}>
              {HORAS.map(hora => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Hora fin:</label>
            <select value={horaFin} onChange={(e) => setHoraFin(e.target.value)}>
              {HORAS.map(hora => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Duración de cita (minutos):</label>
            <select value={minutosCupo} onChange={(e) => setMinutosCupo(Number(e.target.value))}>
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>60 minutos</option>
            </select>
          </div>
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}

      <button
        onClick={handleGuardar}
        disabled={loading}
        className="guardar-button"
      >
        {loading ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </div>
  );
}
