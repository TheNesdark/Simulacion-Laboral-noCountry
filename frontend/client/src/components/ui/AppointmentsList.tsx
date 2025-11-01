import { formatDate } from '@/utils/dateUtils';
import { Cita, Paciente } from '@/types';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useState, useEffect } from 'react';
import { getDoctorById } from '@/services/backend/doctorsService';
import { obtenerPaciente } from '@/services/backend/UserService';
import { Medico } from '@/types';
import { logger } from '@/utils/logger';
import { useNotifications } from '@/utils/notifications';
import '@/styles/components/AppointmentsList.css';

const backgroundColors = [
  '#F8BBD0',
  '#BBDEFB',
  '#C8E6C9',
  '#FFF9C4',
  '#D1C4E9',
  '#FFE0B2',
];

interface AppointmentsListProps {
  appointments: Cita[];
  title: string;
  isLoading: boolean;
  error: Error | null;
  role?: 'paciente' | 'medico';
  onRefresh?: () => void;
}

export default function AppointmentsList({
  appointments,
  title,
  isLoading,
  error,
  role,
  onRefresh,
}: AppointmentsListProps) {
  const notifications = useNotifications();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [doctorsMap, setDoctorsMap] = useState<Record<number, Medico>>({});
  const [patientsMap, setPatientsMap] = useState<Record<number, Paciente>>({});

  // Cargar nombres de médicos (para pacientes)
  useEffect(() => {
    if (role !== 'paciente') return;

    const loadDoctors = async () => {
      const uniqueMedicoIds = [...new Set(appointments.map(a => a.medicoId))];
      const doctors: Record<number, Medico> = {};
      
      await Promise.all(
        uniqueMedicoIds.map(async (medicoId) => {
          try {
            const doctor = await getDoctorById(medicoId);
            doctors[medicoId] = doctor;
          } catch (error) {
            logger.error(`Error al cargar médico ${medicoId}:`, error);
          }
        })
      );
      
      setDoctorsMap(doctors);
    };

    if (appointments.length > 0) {
      loadDoctors();
    }
  }, [appointments, role]);

  // Cargar nombres de pacientes (para médicos)
  useEffect(() => {
    if (role !== 'medico') return;

    const loadPatients = async () => {
      const uniquePacienteIds = [...new Set(appointments.map(a => a.pacienteId))];
      const patients: Record<number, Paciente> = {};
      
      await Promise.all(
        uniquePacienteIds.map(async (pacienteId) => {
          try {
            const patient = await obtenerPaciente(pacienteId);
            patients[pacienteId] = patient;
          } catch (error) {
            logger.error(`Error al cargar paciente ${pacienteId}:`, error);
          }
        })
      );
      
      setPatientsMap(patients);
    };

    if (appointments.length > 0) {
      loadPatients();
    }
  }, [appointments, role]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!appointments.length) {
    return (
      <section className='appointments-list-empty'>
        <h2>{title}</h2>
        <div className='flex items-center justify-center p-4 text-blue-500 m-auto gap-4'>
          <span className='ml-2'>No hay citas programadas.</span>
        </div>
      </section>
    );
  }

  const handleCardClick = (cita: Cita) => {
    if (selectedCardId === cita.id) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(cita.id);
      
      // Si la cita está cancelada, mostrar el diálogo de estado
      if (cita.estado === 'CANCELADA') {
        setSelectedCita(cita);
        setStatusDialogOpen(true);
      }
    }
  };

  const handleCancelClick = (cita: Cita, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCita(cita);
    setCancelDialogOpen(true);
    setSelectedCardId(null);
  };

  const handleRescheduleClick = (cita: Cita, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCita(cita);
    setRescheduleDialogOpen(true);
    setSelectedCardId(null);
  };

  const handleViewDetailsClick = (cita: Cita, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCita(cita);
    setDetailsDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedCita || !motivoCancelacion.trim()) {
      alert('Por favor, ingrese un motivo de cancelación');
      return;
    }

    setIsProcessing(true);
    try {
      const { cancelAppointment } = await import('@/services/backend/appointmentsService');
      await cancelAppointment(selectedCita.id, motivoCancelacion);
      setCancelDialogOpen(false);
      setMotivoCancelacion('');
      setSelectedCita(null);
      if (onRefresh) onRefresh();
      notifications.success('Cita cancelada exitosamente');
    } catch (error) {
      logger.error('Error al cancelar cita:', error);
      notifications.error('Error al cancelar la cita. Por favor, intente nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRescheduleConfirm = async () => {
    if (!selectedCita) return;
    
    setIsProcessing(true);
    try {
      const { cancelAppointment } = await import('@/services/backend/appointmentsService');
      await cancelAppointment(selectedCita.id, 'Reprogramación solicitada por el médico');
      setRescheduleDialogOpen(false);
      setSelectedCita(null);
      if (onRefresh) onRefresh();
      notifications.success('La cita ha sido cancelada. El paciente recibirá una notificación por email para que pueda reprogramarla.');
    } catch (error) {
      logger.error('Error al reprogramar cita:', error);
      notifications.error('Error al cancelar la cita. Por favor, intente nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getDoctorName = (medicoId: number): string => {
    const doctor = doctorsMap[medicoId];
    if (!doctor) return 'Cargando...';
    const title = doctor.genero === 'FEMENINO' ? 'Dra.' : 'Dr.';
    return `${title} ${doctor.nombre} ${doctor.apellido}`;
  };

  const getPatientName = (pacienteId: number): string => {
    const patient = patientsMap[pacienteId];
    if (!patient) return 'Cargando...';
    return `${patient.nombre} ${patient.apellido}`;
  };

  const isToday = (fecha: string): boolean => {
    // Crear fecha de hoy normalizada a medianoche en hora local
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Crear fecha de la cita normalizada a medianoche en hora local
    const appointmentDate = new Date(fecha + 'T00:00:00');
    appointmentDate.setHours(0, 0, 0, 0);
    
    // Comparar las fechas normalizadas
    return today.getTime() === appointmentDate.getTime();
  };

  // Mostrar todas las citas (incluyendo canceladas)
  const filteredAppointments = appointments;

  return (
    <>
      <section className='appointments-list'>
        <h2>{title}</h2>
        {filteredAppointments.length === 0 ? (
          <div className='flex items-center justify-center p-4 text-blue-500 m-auto gap-4'>
            <span className='ml-2'>No hay citas programadas.</span>
          </div>
        ) : (
          filteredAppointments.map((appointment, index) => {
            const isSelected = selectedCardId === appointment.id;
            const doctorName = getDoctorName(appointment.medicoId);
            const patientName = getPatientName(appointment.pacienteId);
            // Mostrar nombre del paciente si es médico, nombre del doctor si es paciente
            const displayName = role === 'medico' ? patientName : doctorName;
            
            return (
              <div key={appointment.id} className="appointment-card-wrapper">
                <article
                  className={`appointment-card ${isSelected ? 'selected' : ''} ${appointment.estado === 'CANCELADA' ? 'cancelled-card' : ''}`}
                  style={{
                    backgroundColor: appointment.estado !== 'CANCELADA' 
                      ? backgroundColors[index % backgroundColors.length]
                      : undefined,
                  }}
                  onClick={() => handleCardClick(appointment)}
                >
                  <div className="appointment-card-content">
                    <div className="appointment-card-left">
                      <h3 className="appointment-motive">
                        {appointment.motivoCita} - {appointment.tipo}
                      </h3>
                      <p className="appointment-doctor">{displayName}</p>
                    </div>
                    <div className="appointment-card-right">
                      <span className="appointment-date-text">
                        {isToday(appointment.fecha) ? 'Hoy' : formatDate(appointment.fecha)}
                      </span>
                      <span className="appointment-time">{appointment.horaInicio}</span>
                    </div>
                  </div>
                </article>
                
                {/* Botones que aparecen al seleccionar */}
                {isSelected && (
                  <div className="appointment-actions-buttons">
                    <button
                      className="appointment-details-button"
                      onClick={(e) => handleViewDetailsClick(appointment, e)}
                    >
                      Ver detalles
                    </button>
                    {appointment.estado === 'PROGRAMADA' && (
                      <button
                        className="appointment-cancel-button"
                        onClick={(e) => role === 'paciente' ? handleCancelClick(appointment, e) : handleRescheduleClick(appointment, e)}
                      >
                        {role === 'paciente' ? 'Cancelar' : 'Reprogramar'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Diálogo para cancelar cita */}
      {role === 'paciente' && cancelDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Cancelar Cita</h2>
            <p className="mb-4">¿Está seguro que desea cancelar esta cita?</p>
            {selectedCita && (
              <div className="mb-4 text-sm">
                <p><strong>Fecha:</strong> {formatDate(selectedCita.fecha)}</p>
                <p><strong>Hora:</strong> {selectedCita.horaInicio}</p>
                <p><strong>Motivo:</strong> {selectedCita.motivoCita}</p>
              </div>
            )}
            <label className="block mb-2">
              <span className="text-sm font-medium">Motivo de cancelación:</span>
              <textarea
                value={motivoCancelacion}
                onChange={(e) => setMotivoCancelacion(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
                rows={3}
                placeholder="Ingrese el motivo de cancelación..."
              />
            </label>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => {
                  setCancelDialogOpen(false);
                  setMotivoCancelacion('');
                  setSelectedCita(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                disabled={isProcessing || !motivoCancelacion.trim()}
              >
                {isProcessing ? 'Procesando...' : 'Confirmar Cancelación'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para reprogramar cita */}
      {role === 'medico' && rescheduleDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Reprogramar Cita</h2>
            <p className="mb-4">¿Desea reprogramar esta cita?</p>
            {selectedCita && (
              <div className="mb-4 text-sm">
                <p><strong>Paciente:</strong> {getPatientName(selectedCita.pacienteId)}</p>
                <p><strong>Fecha actual:</strong> {formatDate(selectedCita.fecha)}</p>
                <p><strong>Hora actual:</strong> {selectedCita.horaInicio}</p>
                <p><strong>Motivo:</strong> {selectedCita.motivoCita}</p>
              </div>
            )}
            <p className="mb-4 text-sm text-gray-600">
              La cita actual se cancelará y el paciente recibirá una notificación por email para que pueda reprogramarla.
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => {
                  setRescheduleDialogOpen(false);
                  setSelectedCita(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={handleRescheduleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : 'Continuar con Reprogramación'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para ver detalles de la cita */}
      {detailsDialogOpen && selectedCita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Detalles de la Cita</h2>
            <div className="mb-4 text-sm space-y-2">
              <p><strong>Estado:</strong> 
                <span className={selectedCita.estado === 'CANCELADA' ? 'text-red-500 font-bold ml-2' : 'ml-2'}>
                  {selectedCita.estado}
                </span>
              </p>
              <p><strong>Fecha:</strong> {formatDate(selectedCita.fecha)}</p>
              <p><strong>Hora:</strong> {selectedCita.horaInicio} - {selectedCita.horaFin}</p>
              <p><strong>Tipo:</strong> {selectedCita.tipo}</p>
              <p><strong>Motivo:</strong> {selectedCita.motivoCita}</p>
              {role === 'medico' ? (
                <p><strong>Paciente:</strong> {getPatientName(selectedCita.pacienteId)}</p>
              ) : (
                <p><strong>Doctor:</strong> {getDoctorName(selectedCita.medicoId)}</p>
              )}
              <p><strong>Clínica:</strong> {selectedCita.nombreClinica}</p>
              {selectedCita.linkVideo && (
                <p><strong>Link de video:</strong> <a href={selectedCita.linkVideo} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{selectedCita.linkVideo}</a></p>
              )}
              {selectedCita.motivoCancelacion && (
                <p><strong>Motivo de cancelación:</strong> {selectedCita.motivoCancelacion}</p>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => {
                  setDetailsDialogOpen(false);
                  setSelectedCita(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo para mostrar estado de cita cancelada */}
      {statusDialogOpen && selectedCita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Estado de la Cita</h2>
            <div className="mb-4">
              <p className="text-red-500 font-bold text-xl mb-2">{selectedCita.estado}</p>
              <div className="text-sm space-y-2">
                <p><strong>Fecha:</strong> {formatDate(selectedCita.fecha)}</p>
                <p><strong>Hora:</strong> {selectedCita.horaInicio}</p>
                <p><strong>Motivo:</strong> {selectedCita.motivoCita}</p>
                {role === 'medico' ? (
                  <p><strong>Paciente:</strong> {getPatientName(selectedCita.pacienteId)}</p>
                ) : (
                  <p><strong>Doctor:</strong> {getDoctorName(selectedCita.medicoId)}</p>
                )}
                {selectedCita.motivoCancelacion && (
                  <p><strong>Motivo de cancelación:</strong> {selectedCita.motivoCancelacion}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => {
                  setStatusDialogOpen(false);
                  setSelectedCita(null);
                  setSelectedCardId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
