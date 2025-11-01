'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDoctorById, updateDoctor } from '@/api/doctorsApi';
import { Medico } from '@/types';

export default function PerfilPage() {
  const { medicoId } = useAuth();
  const [medico, setMedico] = useState<Medico | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (medicoId) {
      cargarMedico();
    }
  }, [medicoId]);

  const cargarMedico = async () => {
    if (!medicoId) return;
    try {
      const data = await getDoctorById(medicoId);
      setMedico(data);
      setNombre(data.nombre);
      setApellido(data.apellido);
      setTelefono(data.telefono);
      setEmail(data.email);
    } catch (err) {
      setError('Error al cargar perfil');
    }
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicoId) return;

    setLoading(true);
    setError(null);

    try {
      await updateDoctor(medicoId, {
        nombre,
        apellido,
        telefono,
        email,
      });
      alert('Perfil actualizado exitosamente');
      await cargarMedico();
    } catch (err) {
      setError('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!medico) return <div className="p-6">Cargando...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

      <form onSubmit={handleGuardar} className="flex flex-col gap-4">
        <div>
          <label className="block font-semibold mb-2">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Teléfono</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Matrícula:</strong> {medico.matricula}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Especialidad:</strong> {medico.nombreEspecialidad}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Clínica:</strong> {medico.nombreClinica}
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00579b] text-white py-3 rounded-lg font-semibold hover:bg-[#003d6b] disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}
