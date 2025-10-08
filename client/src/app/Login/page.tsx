'use client'

import Image from 'next/image'
import '@/styles/pages/Login.css'
import blob from '@/assets/login.png'
import logo from '@/assets/logo.png'
import PacienteLogin from './PacienteLogin'
import ProfesionalLogin from './ProfesionalLogin'
import { useState } from 'react'
export default function Login() {
    const [showPacientesLogin, setShowPacientesLogin] = useState(false)
    const [showProfesionalLogin, setShowProfesionalLogin] = useState(false)

    const handleBack = () => {
        setShowPacientesLogin(false)
        setShowProfesionalLogin(false)
    }

    const handlePacienteLogin = () => {
        setShowPacientesLogin(true)
        console.log('hola')
    }

    const handleProfesionalLogin = () => {
        setShowProfesionalLogin(true)
    }
    if (showPacientesLogin) {
        return <PacienteLogin onBack={handleBack} />
    } else if (showProfesionalLogin) {
        return <ProfesionalLogin onBack={handleBack} />
    } else {
        return (
            <div className="login-container">
                <Image src={blob} alt="Logo" width={300} height={300} />
                <button className="button button-paciente" onClick={handlePacienteLogin}>
                    Soy Paciente
                </button>
                <button className="button button-profesional" onClick={handleProfesionalLogin}>
                    Soy Profesional
                </button>
                <Image src={logo} alt="Logo" width={50} height={50} />
            </div>
        )
    }
}