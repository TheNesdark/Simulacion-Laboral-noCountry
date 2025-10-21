import Image from "next/image";

interface InitialProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function Initial({ onLogin, onRegister }: InitialProps) {
  return (
    <>
      {/* Circulo Rosa */}
      <div className="circle-pink">
        <img className="initial-image" src="/assets/Login.png" alt="user" />
      </div>

      {/* Sección de inicio de sesión */}
      <section className="login">
        {/* Panel de navegacion */}
        <div className="initial-options">
          <button className="button-login" onClick={onLogin}>
            Iniciar Sesión
          </button>
          <button className="button-register" onClick={onRegister}>
            Registrarse
          </button>
        </div>
      </section>
    </>
  );
}
