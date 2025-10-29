package com.salud.portalcitas.util.client;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.ServiceAccountCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
public class GoogleCalendarConfig {

    @Value("${google.calendar.credentials-file}")
    private String credentialsFile;

    @Value("${google.calendar.application-name:ClinicaTurnosApp}")
    private String applicationName;

    // Variable de entorno con el contenido completo del JSON
    @Value("${GOOGLE_CREDENTIALS_JSON:}")
    private String credentialsJson;

    @Bean
    public Calendar googleCalendar() throws Exception {
        var httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        var jsonFactory = JacksonFactory.getDefaultInstance();

        InputStream is;

        if (!credentialsJson.isEmpty()) {
            // Leer desde variable de entorno
            is = new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8));
        } else {
            // Leer desde archivo físico
            is = this.getClass().getResourceAsStream(
                    credentialsFile.startsWith("classpath:") ? credentialsFile.replace("classpath:", "/") : credentialsFile
            );

            if (is == null) {
                throw new IllegalStateException("No se encontró el archivo de credenciales: " + credentialsFile);
            }
        }

        ServiceAccountCredentials credentials = (ServiceAccountCredentials) ServiceAccountCredentials.fromStream(is)
                .createScoped(List.of("https://www.googleapis.com/auth/calendar"));

        return new Calendar.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName(applicationName)
                .build();
    }
}
