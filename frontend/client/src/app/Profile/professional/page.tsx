"use client";
import React, { useState, useRef } from 'react';
import "@/styles/pages/Profile.css";

const specialties = [
  'Medicina General',
  'Cardiología',
  'Dermatología',
  'Ginecología',
  'Neurología',
  'Oftalmología',
  'Pediatría',
  'Psiquiatría',
  'Radiología',
  'Traumatología',
  'Urología',
];

export default function SwitchToProfessionalPage() {
  const [formData, setFormData] = useState({
    matricula: '',
    especialidad: '',
  });

  const [files, setFiles] = useState({
    dniFrontal: null as File | null,
    dniPosterior: null as File | null,
    titulo: null as File | null,
  });

  const [dragStates, setDragStates] = useState({
    dniFrontal: false,
    dniPosterior: false,
    titulo: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles(prev => ({
        ...prev,
        [name]: fileList[0]
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent, fieldName: string) => {
    e.preventDefault();
    setDragStates(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const handleDragLeave = (e: React.DragEvent, fieldName: string) => {
    e.preventDefault();
    setDragStates(prev => ({
      ...prev,
      [fieldName]: false
    }));
  };

  const handleDrop = (e: React.DragEvent, fieldName: string) => {
    e.preventDefault();
    setDragStates(prev => ({
      ...prev,
      [fieldName]: false
    }));

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles[0]) {
      setFiles(prev => ({
        ...prev,
        [fieldName]: droppedFiles[0]
      }));
    }
  };

  const FileUploadZone = ({
    label,
    fieldName,
    accept,
    required
  }: {
    label: string;
    fieldName: string;
    accept: string;
    required: boolean;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const currentFile = files[fieldName as keyof typeof files];

    return (
      <div className="form-group">
        <label>{label}</label>
        <div
          className={`file-upload-zone ${dragStates[fieldName as keyof typeof dragStates] ? 'drag-over' : ''} ${currentFile ? 'has-file' : ''}`}
          onDragOver={(e) => handleDragOver(e, fieldName)}
          onDragLeave={(e) => handleDragLeave(e, fieldName)}
          onDrop={(e) => handleDrop(e, fieldName)}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            name={fieldName}
            onChange={handleFileChange}
            accept={accept}
            required={required}
            style={{ display: 'none' }}
          />
          <div className="upload-content">
            {currentFile ? (
              <>
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <span className="file-name">{currentFile.name}</span>
                  <span className="file-size">({(currentFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              </>
            ) : (
              <>
                <div className="upload-icon">📎</div>
                <div className="upload-text">
                  <span className="primary-text">Arrastra y suelta tu archivo aquí</span>
                  <span className="secondary-text">o haz clic para seleccionar</span>
                </div>
              </>
            )}
          </div>
        </div>
        <small className="file-hint">Formatos aceptados: JPG, PNG, PDF. Máximo 5MB</small>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos profesionales:', formData);
    console.log('Archivos:', files);

    if (!formData.matricula || !formData.especialidad) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    if (!files.dniFrontal || !files.dniPosterior || !files.titulo) {
      alert('Por favor adjunte todos los documentos requeridos');
      return;
    }

    alert('Solicitud enviada exitosamente. Será revisada por nuestro equipo.');
  };

  return (
    <div className="edit-profile-page">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="matricula">Número de Matrícula Profesional</label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={formData.matricula}
            onChange={handleInputChange}
            placeholder="Ingrese su número de matrícula"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="especialidad">Especialidad</label>
          <select
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una especialidad</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <FileUploadZone
          label="DNI - Parte Anterior"
          fieldName="dniFrontal"
          accept="image/*,.pdf"
          required
        />

        <FileUploadZone
          label="DNI - Parte Posterior"
          fieldName="dniPosterior"
          accept="image/*,.pdf"
          required
        />

        <FileUploadZone
          label="Título Habilitante"
          fieldName="titulo"
          accept="image/*,.pdf"
          required
        />

        <button type="submit" className="save-button">
          Enviar
        </button>
      </form>
    </div>
  );
}