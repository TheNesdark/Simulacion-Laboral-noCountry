import { Paciente, Medico, PacienteRequest, MedicoRequest } from "../../types";

import { API_BASE_URL } from './config';
import { logger } from '@/utils/logger';

// Paciente CRUD
export async function crearPaciente(
  pacienteData: PacienteRequest,
): Promise<Paciente> {
  try {
    const response = await fetch(`${API_BASE_URL}/pacientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pacienteData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear paciente: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    logger.error('Error en crearPaciente:', error);
    throw error;
  }
}

export async function obtenerPaciente(id: number): Promise<Paciente> {
  const response = await fetch(`${API_BASE_URL}/pacientes/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener paciente");
  }

  return response.json();
}

export async function listarPacientes(): Promise<Paciente[]> {
  const response = await fetch(`${API_BASE_URL}/pacientes`);

  if (!response.ok) {
    throw new Error("Error al listar pacientes");
  }

  return response.json();
}

export async function actualizarPaciente(
  id: number,
  pacienteData: PacienteRequest,
): Promise<Paciente> {
  const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pacienteData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar paciente");
  }

  return response.json();
}

export async function eliminarPaciente(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar paciente");
  }
}


export async function crearMedico(medicoData: MedicoRequest): Promise<Medico> {
  const response = await fetch(`${API_BASE_URL}/medicos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medicoData),
  });
  
  if (!response.ok) {
    throw new Error('Error al crear médico');
  }
  
  return response.json();
}

export async function obtenerMedico(id: number): Promise<Medico> {
  const response = await fetch(`${API_BASE_URL}/medicos/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener médico");
  }

  return response.json();
}

export async function listarMedicos(): Promise<Medico[]> {
  const response = await fetch(`${API_BASE_URL}/medicos`);

  if (!response.ok) {
    throw new Error("Error al listar médicos");
  }

  return response.json();
}

export async function actualizarMedico(
  id: number,
  medicoData: Partial<MedicoRequest>,
): Promise<Medico> {
  const response = await fetch(`${API_BASE_URL}/medicos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicoData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar médico");
  }

  return response.json();
}

export async function eliminarMedico(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/medicos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar médico");
  }
}
