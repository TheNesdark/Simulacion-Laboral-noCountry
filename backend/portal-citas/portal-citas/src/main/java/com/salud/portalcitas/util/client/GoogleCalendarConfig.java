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

    @Value("${google.calendar.credentials-file:}")
    private String credentialsFile;

    @Value("${google.calendar.application-name:ClinicaTurnosApp}")
    private String applicationName;

    // Variables individuales de la Service Account
    @Value("${google.calendar.client-email:}")
    private String clientEmail;

    @Value("${google.calendar.private-key:}")
    private String privateKey;

    @Value("${google.calendar.private-key-id:}")
    private String privateKeyId;

    @Value("${google.calendar.project-id:}")
    private String projectId;

    @Value("${google.calendar.token-uri:}")
    private String tokenUri;

    @Value("${google.calendar.auth-uri:}")
    private String authUri;

    @Value("${google.calendar.auth-provider-cert-url:}")
    private String authProviderCertUrl;

    @Value("${google.calendar.client-cert-url:}")
    private String clientCertUrl;

    // Variable de entorno con el contenido completo del JSON
    @Value("${GOOGLE_CREDENTIALS_JSON:}")
    private String credentialsJson;

    @Bean
    public Calendar googleCalendar() throws Exception {
        var httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        var jsonFactory = JacksonFactory.getDefaultInstance();

        InputStream is;

        // Intentar usar las variables individuales primero
        if (!clientEmail.isEmpty() && !privateKey.isEmpty()) {
            String credentialsJson = buildCredentialsJson();
            is = new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8));
        } else if (!credentialsJson.isEmpty()) {
            // Leer desde variable de entorno con JSON completo
            is = new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8));
        } else {
            // Leer desde archivo físico
            is = this.getClass().getResourceAsStream(
                    credentialsFile.startsWith("classpath:") ? credentialsFile.replace("classpath:", "/") : credentialsFile
            );

            if (is == null) {
                throw new IllegalStateException("No se encontraron las credenciales de Google Calendar. Configure las variables de entorno o un archivo de credenciales.");
            }
        }

        ServiceAccountCredentials credentials = (ServiceAccountCredentials) ServiceAccountCredentials.fromStream(is)
                .createScoped(List.of("https://www.googleapis.com/auth/calendar"));

        return new Calendar.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName(applicationName)
                .build();
    }

    /**
     * Construye el JSON de credenciales desde las variables de entorno individuales
     */
    private String buildCredentialsJson() {
        return """
            {
              "type": "service_account",
              "project_id": "%s",
              "private_key_id": "%s",
              "private_key": "%s",
              "client_email": "%s",
              "client_id": "103105373014233457291",
              "auth_uri": "%s",
              "token_uri": "%s",
              "auth_provider_x509_cert_url": "%s",
              "client_x509_cert_url": "%s"
            }
            """.formatted(
                projectId,
                privateKeyId,
                privateKey.replace("\\n", "\n"),
                clientEmail,
                authUri,
                tokenUri,
                authProviderCertUrl,
                clientCertUrl
            );
    }
}
