"use client"

import AppointmentsList from '@/components/ui/AppointmentsList';
import Dialog from '@/components/ui/Dialog';
import useCalendar from '@/hooks/useCalendar';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

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
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [motivo, setMotivo] = useState('');
    const [clinica, setClinica] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [ocupados, setOcupados] = useState<string[]>([]);
    const { handleActiveStartDateChange, monthAppointments, isDateHasAppointment } = useCalendar();
    const router = useRouter();
    const params = useParams();
    const MedicoId = params?.MedicoId as string;

    useEffect(() => {
        if (!selectedDate) return;

        const diaSemana = selectedDate.getDay();
        const horarioDia = ListHours.find(h => h.diaSemana === diaSemana);

        if (!horarioDia) {
            setAvailableHours([]);
            return;
        }

        const start = horarioDia.horaInicio.split(":").map(Number);
        const end = horarioDia.horaFin.split(":").map(Number);
        const cupo = horarioDia.minutosCupo;

        const hours: string[] = [];
        let current = new Date(selectedDate);
        current.setHours(start[0], start[1], 0, 0);

        const endDate = new Date(selectedDate);
        endDate.setHours(end[0], end[1], 0, 0);

        while (current <= endDate) {
            const h = `${String(current.getHours()).padStart(2, "0")}:${String(current.getMinutes()).padStart(2, "0")}`;
            hours.push(h);
            current.setMinutes(current.getMinutes() + cupo);
        }

        setAvailableHours(hours);
        setSelectedHour(null);

        const ocupadosHoy = monthAppointments
            .filter(appt => {
                const apptDate = new Date(appt.date);
                return (
                    apptDate.getFullYear() === selectedDate.getFullYear() &&
                    apptDate.getMonth() === selectedDate.getMonth() &&
                    apptDate.getDate() === selectedDate.getDate()
                );
            })
            .map(appt => appt.time);

        setOcupados(ocupadosHoy);

    }, [selectedDate, monthAppointments]);

    const handleOpenConfirm = () => {
        if (!selectedDate || !selectedHour || !motivo || !clinica) {
            alert('Por favor, complete todos los campos');
            return;
        }
        setOpenConfirm(true);
    };

    const handleConfirm = () => {
        setOpenConfirm(false);
        router.push(`./${MedicoId}/Respuesta`);
    };

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full">
                <div className="space-y-6 p-6">
                    <h2 className="text-lg font-semibold text-gray-800">Seleccionar fecha:</h2>
                    <Calendar
                        className={'calendar'}
                        onActiveStartDateChange={handleActiveStartDateChange}
                        tileClassName={({ date }) => selectedDate && date.toDateString() === selectedDate.toDateString() ? 'bg-sky-500 text-white rounded-full' : ''}
                        onChange={(date) => setSelectedDate(date as Date)}
                        value={selectedDate}
                    />
                    <div>
                        <h3 className="text-gray-800 font-semibold mb-2">Horarios disponibles:</h3>
                        <div className="flex flex-wrap gap-2">
                            {availableHours.map((hour) => (
                                <button
                                    key={hour}
                                    onClick={() => setSelectedHour(hour)}
                                    className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${selectedHour === hour
                                        ? 'bg-sky-500 text-white'
                                        : 'bg-red-400 text-white hover:bg-red-500'
                                        }`}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Motivo de consulta:</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        >
                            <option value="">Motivo de consulta</option>
                            <option value="general">Consulta general</option>
                            <option value="control">Control</option>
                            <option value="especialista">Derivación a especialista</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Hospital/Clínica:</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
                            value={clinica}
                            onChange={(e) => setClinica(e.target.value)}
                        >
                            <option value="">Hospital/Clínica</option>
                            <option value="central">Hospital Central</option>
                            <option value="san-juan">Clínica San Juan</option>
                            <option value="vida">Centro Vida</option>
                        </select>
                    </div>

                    <button
                        onClick={handleOpenConfirm}
                        disabled={!selectedDate || !selectedHour || !motivo || !clinica}
                        className="w-full bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00579b] text-white font-semibold rounded-lg py-2"
                    >
                        Reservar turno
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
