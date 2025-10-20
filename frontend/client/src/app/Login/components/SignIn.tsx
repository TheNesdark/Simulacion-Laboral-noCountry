"use client";
interface SignInProps {
  onBack: () => void;
}

export default function SignIn({ onBack }: SignInProps) {
  return (
    <>
      <button className="button-back" onClick={onBack}>
        <img src="/assets/icons/back-icon.svg" alt="back" />
      </button>
      <div className="login-title">Iniciar Sesión</div>
      <form className="login-form" action="">
        <label htmlFor="paciente-email">Correo electrónico</label>
        <input
          id="paciente-email"
          type="email"
          placeholder="Correo electrónico"
        />
        <label htmlFor="paciente-password">Contraseña</label>
        <input
          id="paciente-password"
          type="password"
          placeholder="Contraseña"
        />
        <span>Olvidé mi contraseña</span>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div className="login-options">
        <img
          src="/assets/icons/google-icon.svg"
          alt="google"
          width={40}
          height={40}
        />
        <img
          src="/assets/icons/facebook-icon.svg"
          alt="facebook"
          width={40}
          height={40}
        />
      </div>
    </>
  );
}
