export default function DoctorsList() {
  return (
    <section className="medicos">
      <h2>Medicos</h2>
      <ul>
        <li>
          <img src="/images/doctor1.jpg" alt="Doctor 1" />
          <div className="medico-details">
            <h3>Dr. John Doe</h3>
            <p>Cardiologo</p>
          </div>
        </li>
        <li>
          <img src="/images/doctor2.jpg" alt="Doctor 2" />
          <div className="medico-details">
            <h3>Dr. Jane Smith</h3>
            <p>Pediatria</p>
          </div>
        </li>
      </ul>
    </section>
  );
}
