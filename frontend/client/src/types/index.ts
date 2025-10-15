export interface Report {
    id: string;
    title: string;
    date: string;
    doctor: string;
    status: "Disponibles" | "Pendientes";
}

export type Reports = Report[];

export type ReportFilter = "Disponibles" | "Pendientes";