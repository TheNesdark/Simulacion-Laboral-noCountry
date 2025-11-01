'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDoctorAvailabilities, createAvailability, deleteAvailability, Disponibilidad } from '@/api/availabilityApi';
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
  }, [medicoId]);

  const cargarDisponibilidades = async () => {
    if (!medicoId) return;
    try {
      const data = await getDoctorAvailabilities(medicoId);
      setDisponibilidades(data);
      
      const diasActivos = data.map(d => d.diaSemana);
      setDiasSeleccionados(diasActivos);
      
      if (data.length > 0) {
        const horaIni = data[0].horaInicio.substring(0, 5);
        const horaFn = data[0].horaFin.substring(0, 5);
        setHoraInicio(horaIni);
        setHoraFin(horaFn);
        setMinutosCupo(data[0].minutosCupo);
      }
    } catch (err) {
      console.error('Error al cargar disponibilidades:', err);
      setError('Error al cargar disponibilidades');
    }
  };

  const toggleDia = (dia: number) => {
    setDiasSeleccionados(prev => {
      const newDias = prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia];
      console.log('Días seleccionados:', newDias);
      return newDias;
    });
  };

  const handleGuardar = async () => {
    if (!medicoId) return;
    setLoading(true);
    setError(null);

    try {
      console.log('Eliminando disponibilidades:', disponibilidades);
      for (const disp of disponibilidades) {
        console.log('Disponibilidad completa:', disp);
        if (disp.id) {
          console.log('Eliminando disponibilidad ID:', disp.id);
          await deleteAvailability(disp.id);
        } else {
          console.log('Disponibilidad sin ID, no se puede eliminar');
        }
      }

      console.log('Días a crear:', diasSeleccionados);
      for (const dia of diasSeleccionados) {
        console.log('Creando disponibilidad:', { dia, horaInicio, horaFin, minutosCupo });
        await createAvailability(medicoId, {
          diaSemana: dia,
          horaInicio,
          horaFin,
          minutosCupo,
        });
      }

      console.log('Recargando disponibilidades...');
      await cargarDisponibilidades();
      alert('Horarios guardados exitosamente');
    } catch (err: any) {
      console.error('Error completo:', err);
      setError(err.message || 'Error al guardar horarios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="horario-page">
      <h1>Modificar horario</h1>

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
