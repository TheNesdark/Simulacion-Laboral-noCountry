package com.salud.portalcitas.entity;

import com.salud.portalcitas.util.enums.EstadoCita;
import com.salud.portalcitas.util.enums.TipoCita;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "citas")
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private Medico medico;

    @OneToOne
    @JoinColumn(name = "cupo_id", unique = true)
    private Cupo cupo;

    @Enumerated(EnumType.STRING)
    private TipoCita tipo;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado = EstadoCita.PROGRAMADA;

    private String linkVideo;

    private String googleEventId;

    @Column(name = "motivo_cancelacion")
    private String motivoCancelacion;

    @Column(name = "creado_en")
    private LocalDateTime creadoEn = LocalDateTime.now();

}
