'use client'

interface ProfesionalLoginProps {
    onBack: () => void;
}

export default function ProfesionalLogin({ onBack }: ProfesionalLoginProps) {
    return (
        <div className="login-container">
            <button className="button-back" onClick={onBack}>Volver</button>
            <div className="login-title">Soy Profesional</div>
            <form className="login-form" action="">
                <label htmlFor="">Correo electronico</label>
                <input type="text" placeholder="Correo electronico" />
                <label htmlFor="">Contraseña</label>
                <input type="password" placeholder="Contraseña" />
                <span>Olvide mi contraseña</span>
                <button className="button button-login" type="submit">Iniciar Sesión</button>
            </form>
            <div className="flex justify-center pt-12">
                <span className="text-gray-500 mr-2">¿No tienes cuenta?</span><a href="" className="text-blue-500">Registrarse</a>
            </div>
        </div>
    )
}