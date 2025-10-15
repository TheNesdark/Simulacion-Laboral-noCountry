export interface Appointment {
    id: string;
    date: string;
    title: string;
    doctor: string;
    time: string;
}

export type Appointments = Appointment[];