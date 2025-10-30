import { Timestamp } from "firebase/firestore";

export interface MedicalExam {
  id: string;
  title: string;
  date: string;
  doctor: string;
  status: 'Disponibles' | 'Pendientes';
}
export type MedicalExams = MedicalExam[];
export type MedicalExamFilter = 'Disponibles' | 'Pendientes';

export interface Clinic {
  id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
  color: string;
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
  category: 'recent' | 'favorites' | 'all';
}

export type Doctors = Doctor[];

export interface Specialty {
  id: string;
  name: string;
  letter: string;
}

export interface SpecialtiesGroup {
  letter: string;
  specialties: string[];
}

export type Specialties = Specialty[];


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