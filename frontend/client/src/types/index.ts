import { Timestamp } from "firebase/firestore";

export interface MedicalExam {
  id: string;
  title: string;
  date: string;
  doctor: string;
  status: "Disponibles" | "Pendientes";
}
export type MedicalExams = MedicalExam[];
export type MedicalExamFilter = "Disponibles" | "Pendientes";

export interface Clinic {
  id: string;
  nombre: string;
  descripcion: string;
  telefono: string;
  direccion: string;
}
export type Clinics = Clinic[];

export interface Appointment {
  id: string;
  date: string;
  title: string;
  doctor: string;
  time: string;
}

export type Appointments = Appointment[];

export interface UserData {
  nombres: string;
  apellidos: string;
  documento: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  genero?: string;
  photoURL: string;
  role: 'medico' | 'paciente';
  createdAt: Date;
}

export interface RegisterProps {
  documento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  password: string;
  genero: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  category: "recent" | "favorites" | "all";
}

export type Doctors = Doctor[];

export interface Specialty {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: Timestamp;
  createdAt: Timestamp;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: Timestamp;
  readBy: string[];
}

// Tipos para Pacientes
export interface Paciente {
  id: number;
  userId?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  genero: "M" | "F" | "O";
  numeroDocumento: string;
  email: string;
  fechaNacimiento: string; // Formato: YYYY-MM-DD
}

export interface PacienteRequest {
  userId?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  genero: "M" | "F" | "O";
  numeroDocumento: string;
  email: string;
  fechaNacimiento: string; // Formato: YYYY-MM-DD
}

// Tipos para Médicos
export interface Medico {
  id: number;
  userId?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  genero: "M" | "F" | "O";
  numeroDocumento: string;
  fechaNacimiento: string; // Formato: YYYY-MM-DD
  matricula: number;
  email: string;
  clinica?: {
    id: number;
    nombre: string;
  };
  especialidad?: {
    id: number;
    nombre: string;
  };
}

export interface MedicoRequest {
  userId?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  genero: "M" | "F" | "O";
  numeroDocumento: string;
  fechaNacimiento: string; // Formato: YYYY-MM-DD
  matricula: number;
  email: string;
  clinicaId: number;
  especialidadId: number;
}
