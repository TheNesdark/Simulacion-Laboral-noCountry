'use client'
interface SignUpProps {
 onBack: () => void;
}

export default function SignUp({ onBack }: SignUpProps) {
    return (
        <div className="login-container">
            <button className="button-back" onClick={onBack}>
                <img src="/assets/icons/back-icon.svg" alt="back"/>
            </button>
            <div className="login-title">Registrarse</div>
                <form className="register-form" action="">
                    <label htmlFor="paciente-name">Nombre y Apellido</label>
                    <input id="paciente-name" type="text" placeholder="Nombre y Apellido" />
                    <label htmlFor="paciente-email">Correo electrónico</label>
                    <input id="paciente-email" type="email" placeholder="Correo electrónico" />
                    <label htmlFor="paciente-password">Contraseña</label>
                    <input id="paciente-password" type="password" placeholder="Contraseña" />
                    <button type="submit">Registrarse</button>
                </form>
        </div>
    )
}