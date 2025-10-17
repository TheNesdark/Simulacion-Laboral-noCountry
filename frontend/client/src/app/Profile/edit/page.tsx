"use client";
import React, { useState } from 'react';
import "@/styles/pages/Profile.css";
import EditIcon from "@/components/icons/EditIcon";

const initialUserData = {
  nombre: 'Juan',
  apellidos: 'Pérez García',
  documento: '12345678',
  fechaNacimiento: '1990-05-15',
  correo: 'juan.perez@example.com',
  telefono: '+5491123456789',
};

export default function EditProfilePage() {
  const [formData, setFormData] = useState(initialUserData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos guardados:', formData);

    alert('Cambios guardados exitosamente');
  };

  return (
    <div className="edit-profile-page">
      <div className="profile-banner edit-banner">
        <div className="profile-image-container">
          <div className="profile-image">
            <span>J</span>
          </div>
          <button className="edit-photo-btn" type="button" aria-label="Editar foto">
            <EditIcon />
          </button>
        </div>
        <div className="profile-name-display">
          <h2>{formData.nombre} {formData.apellidos}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="documento">Número de Documento</label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={formData.documento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Número de Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="save-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}