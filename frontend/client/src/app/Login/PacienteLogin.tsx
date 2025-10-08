'use client'

interface PacienteLoginProps {
    onBack: () => void;
}

export default function PacienteLogin({ onBack }: PacienteLoginProps){
    return (
        <div className="login-container">
            <button className="Btn-back"
                onClick={onBack}>Volver</button>
            <form action="">
                <label htmlFor="">Correo</label>
                <input type="text" />
                <label htmlFor="">Contraseña</label>
                <input type="text" />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}