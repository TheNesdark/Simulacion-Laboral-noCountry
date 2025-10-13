'use client'
import Image from "next/image";
interface ProfesionalLoginProps {
    onBack: () => void;
}

export default function ProfesionalLogin({ onBack }: ProfesionalLoginProps) {
    return (
        <div className="login-container">
            <button className="button-back" onClick={onBack}>
                <Image src="/assets/icons/back-icon.svg" alt="back" width={40} height={40} />
            </button>
            <div className="login-title">Soy Profesional</div>
            <div className="login-body">
                <form className="login-form" action="">
                    <label htmlFor="profesional-email">Correo electronico</label>
                    <input id="profesional-email" type="email" placeholder="Correo electronico" />
                    <label htmlFor="profesional-password">Contraseña</label>
                    <input id="profesional-password" type="password" placeholder="Contraseña" />
                    <span className="forgot-password">Olvide mi contraseña</span>
                    <button className="button button-login" type="submit">Iniciar Sesión</button>
                </form>
                <div className="register">
                    <span>¿No tienes cuenta?  </span>
                    <button type="button" className="register-link">Registrarse</button>
                </div>
                <div className="register-options">
                    <Image src="/assets/icons/google-icon.svg" alt="google" width={40} height={40} />
                    <Image src="/assets/icons/facebook-icon.svg" alt=" facebook" width={40} height={40} />
                </div>
            </div>
        </div>
    )
}