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
    @Value("${GOOGLE_PROJECT_ID:}")
    private String projectId;

    @Value("${GOOGLE_PRIVATE_KEY_ID:}")
    private String privateKeyId;

    @Value("${GOOGLE_PRIVATE_KEY:}")
    private String privateKey;

    @Value("${GOOGLE_CLIENT_EMAIL:}")
    private String clientEmail;

    @Value("${GOOGLE_CLIENT_ID:}")
    private String clientId;

    @Value("${GOOGLE_AUTH_URI:https://accounts.google.com/o/oauth2/auth}")
    private String authUri;

    @Value("${GOOGLE_TOKEN_URI:https://oauth2.googleapis.com/token}")
    private String tokenUri;

    @Value("${GOOGLE_AUTH_PROVIDER_CERT_URL:https://www.googleapis.com/oauth2/v1/certs}")
    private String authProviderCertUrl;

    @Value("${GOOGLE_CLIENT_CERT_URL:}")
    private String clientCertUrl;

    @Bean
    @org.springframework.boot.autoconfigure.condition.ConditionalOnProperty(
        name = "google.calendar.enabled",
        havingValue = "true",
        matchIfMissing = false
    )
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
