package com.salud.portalcitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PortalCitasApplication {

	public static void main(String[] args) {
		// Asegurar que el puerto se lea desde la variable de entorno PORT de Railway
		String port = System.getenv("PORT");
		if (port != null && !port.isEmpty()) {
			System.setProperty("server.port", port);
		}
		SpringApplication.run(PortalCitasApplication.class, args);
	}

}
