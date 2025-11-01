"use client"

import Dialog from '@/components/ui/Dialog';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/styles/pages/PedirCita.css';
import { createAppointment, getCuposDisponibles } from '@/api/appointmentsApi';
import { CupoDisponible } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { getDoctorAvailabilities } from '@/api/availabilityApi';

interface Hours {
    diaSemana: number; // 0 = domingo
    horaInicio: string;
    horaFin: string;
    minutosCupo: number;
}

const ListHours: Hours[] = [
    { diaSemana: 1, horaInicio: "09:00", horaFin: "17:00", minutosCupo: 30 },
    { diaSemana: 2, horaInicio: "09:00", horaFin: "17:00", minutosCupo: 30 },
    { diaSemana: 3, horaInicio: "09:00", horaFin: "17:00", minutosCupo: 30 },
    { diaSemana: 4, horaInicio: "09:00", horaFin: "17:00", minutosCupo: 30 },
    { diaSemana: 5, horaInicio: "09:00", horaFin: "17:00", minutosCupo: 30 },
];
export default function PedirTurnoPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedCupo, setSelectedCupo] = useState<CupoDisponible | null>(null);
    const [motivo, setMotivo] = useState('');
    const [tipo, setTipo] = useState<'PRESENCIAL' | 'VIRTUAL'>('PRESENCIAL');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [cuposDisponibles, setCuposDisponibles] = useState<CupoDisponible[]>([]);
    const [diasDisponibles, setDiasDisponibles] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { pacienteId } = useAuth();
    const router = useRouter();
    const params = useParams();
    const MedicoId = params?.MedicoId as string;

    useEffect(() => {
        if (!MedicoId) return;
        const fetchDisponibilidades = async () => {
            try {
                const disp = await getDoctorAvailabilities(Number(MedicoId));
                setDiasDisponibles(disp.map(d => d.diaSemana));
            } catch (err) {
                console.error('Error al cargar disponibilidades');
            }
        };
        fetchDisponibilidades();
    }, [MedicoId]);

    useEffect(() => {
        if (!selectedDate || !MedicoId) return;

        const fetchCupos = async () => {
            setLoading(true);
            setError(null);
            try {
                const fecha = selectedDate.toISOString().split('T')[0];
                console.log('Buscando cupos para:', { medicoId: MedicoId, fecha });
                const cupos = await getCuposDisponibles(Number(MedicoId), fecha);
                console.log('Cupos recibidos:', cupos);
                const disponibles = cupos.filter(c => c.disponible);
                console.log('Cupos disponibles:', disponibles);
                setCuposDisponibles(disponibles);
            } catch (err) {
                console.error('Error al cargar cupos:', err);
                setError('Error al cargar cupos disponibles');
                setCuposDisponibles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCupos();
        setSelectedCupo(null);
    }, [selectedDate, MedicoId]);

    const handleOpenConfirm = () => {
        if (!selectedDate || !selectedCupo || !motivo || !pacienteId) {
            alert('Por favor, complete todos los campos');
            return;
        }
        setOpenConfirm(true);
    };

    const handleConfirm = async () => {
        if (!selectedCupo || !pacienteId) return;

        setLoading(true);
        try {
            await createAppointment({
                cupoId: selectedCupo.id,
                pacienteId,
                tipo,
                motivoCita: motivo,
            });
            setOpenConfirm(false);
            router.push(`./${MedicoId}/Respuesta`);
        } catch (err) {
            setError('Error al crear la cita');
            setOpenConfirm(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full">
                <div className="space-y-6 p-6">
                    <h2 className="text-lg font-semibold text-gray-800">Seleccionar fecha:</h2>
                    <Calendar
                        className={'calendar'}
                        tileClassName={({ date }) => {
                            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                            const isDayAvailable = diasDisponibles.includes(date.getDay());
                            if (isSelected) return 'selected-date';
                            if (isDayAvailable && date >= new Date()) return 'available-date';
                            return '';
                        }}
                        onChange={(date) => setSelectedDate(date as Date)}
                        value={selectedDate}
                        minDate={new Date()}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <h3 className="text-gray-800 font-semibold mb-2">Horarios disponibles:</h3>
                        {loading ? (
                            <p className="text-gray-500">Cargando...</p>
                        ) : cuposDisponibles.length === 0 ? (
                            <p className="text-gray-500">No hay cupos disponibles para esta fecha</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {cuposDisponibles.map((cupo) => (
                                    <button
                                        key={cupo.id}
                                        onClick={() => setSelectedCupo(cupo)}
                                        className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                                            selectedCupo?.id === cupo.id
                                                ? 'bg-sky-500 text-white'
                                                : 'bg-green-400 text-white hover:bg-green-500'
                                        }`}
                                    >
                                        {cupo.horaInicio}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Tipo de consulta:</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value as 'PRESENCIAL' | 'VIRTUAL')}
                        >
                            <option value="PRESENCIAL">Presencial</option>
                            <option value="VIRTUAL">Virtual</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Motivo de consulta:</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                            placeholder="Describa el motivo de su consulta"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleOpenConfirm}
                        disabled={!selectedDate || !selectedCupo || !motivo || loading}
                        className="w-full bg-[#00579b] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#003d6b] text-white font-semibold rounded-lg py-2"
                    >
                        {loading ? 'Procesando...' : 'Reservar turno'}
                    </button>
                </div>
            </div>

            {/* Modal de confirmación */}
            <Dialog
                open={openConfirm}
                setOpen={setOpenConfirm}
                onConfirm={handleConfirm}
                title="Reservar turno"
                message="¿Deseas reservar el turno?"
            />
        </div>
    );
}
