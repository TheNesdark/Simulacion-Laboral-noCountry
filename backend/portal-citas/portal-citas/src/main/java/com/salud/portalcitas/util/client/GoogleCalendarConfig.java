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

    @Value("${google.calendar.application-name:ClinicaTurnosApp}")
    private String applicationName;

    // Variables de entorno para credenciales de Google
    @Value("${google.project-id:}")
    private String projectId;

    @Value("${google.private-key-id:}")
    private String privateKeyId;

    @Value("${google.private-key:}")
    private String privateKey;

    @Value("${google.client-email:}")
    private String clientEmail;

    @Value("${google.client-id:}")
    private String clientId;

    @Value("${google.auth-uri:https://accounts.google.com/o/oauth2/auth}")
    private String authUri;

    @Value("${google.token-uri:https://oauth2.googleapis.com/token}")
    private String tokenUri;

    @Value("${google.auth-provider-cert-url:https://www.googleapis.com/oauth2/v1/certs}")
    private String authProviderCertUrl;

    @Value("${google.client-cert-url:}")
    private String clientCertUrl;

    @Bean
    public Calendar googleCalendar() throws Exception {
        var httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        var jsonFactory = JacksonFactory.getDefaultInstance();

        InputStream is;

        // Verificar si hay credenciales en variables de entorno
        if (!projectId.isEmpty() && !privateKey.isEmpty() && !clientEmail.isEmpty()) {
            // Construir JSON desde variables de entorno
            String credentialsJson = String.format("""
                {
                  "type": "service_account",
                  "project_id": "%s",
                  "private_key_id": "%s",
                  "private_key": "%s",
                  "client_email": "%s",
                  "client_id": "%s",
                  "auth_uri": "%s",
                  "token_uri": "%s",
                  "auth_provider_x509_cert_url": "%s",
                  "client_x509_cert_url": "%s",
                  "universe_domain": "googleapis.com"
                }
                """,
                projectId,
                privateKeyId,
                privateKey.replace("\\n", "\n"), // Convertir \n literales a saltos de línea
                clientEmail,
                clientId,
                authUri,
                tokenUri,
                authProviderCertUrl,
                clientCertUrl
            );
            
            is = new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8));
        } else {
            // Fallback: intentar cargar desde classpath
            is = this.getClass().getResourceAsStream("/google-credentials.json");
            
            if (is == null) {
                throw new IllegalStateException(
                    "No se encontraron credenciales de Google Calendar. " +
                    "Configura las variables de entorno: GOOGLE_PROJECT_ID, GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_EMAIL"
                );
            }
        }

        ServiceAccountCredentials credentials = (ServiceAccountCredentials) ServiceAccountCredentials.fromStream(is)
                .createScoped(List.of("https://www.googleapis.com/auth/calendar"));

        return new Calendar.Builder(httpTransport, jsonFactory, new HttpCredentialsAdapter(credentials))
                .setApplicationName(applicationName)
                .build();
    }
}
