package com.salud.portalcitas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PortalCitasApplication {

	public static void main(String[] args) {
		SpringApplication.run(PortalCitasApplication.class, args);
	}

}
