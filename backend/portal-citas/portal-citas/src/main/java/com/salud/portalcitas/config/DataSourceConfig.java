package com.salud.portalcitas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    @Primary
    public DataSource dataSource(
            @Value("${spring.datasource.url:}") String jdbcUrl,
            @Value("${spring.datasource.username:}") String username,
            @Value("${spring.datasource.password:}") String password
    ) {
        DataSourceBuilder<?> builder = DataSourceBuilder.create();

        // Si DATABASE_URL está disponible (formato Railway: postgresql://user:pass@host:port/db)
        if (databaseUrl != null && !databaseUrl.isEmpty() && !databaseUrl.startsWith("jdbc:")) {
            try {
                URI dbUri = new URI(databaseUrl.replace("postgresql://", "postgres://"));
                String dbUrl = String.format(
                    "jdbc:postgresql://%s:%d%s",
                    dbUri.getHost(),
                    dbUri.getPort(),
                    dbUri.getPath()
                );
                String dbUser = dbUri.getUserInfo().split(":")[0];
                String dbPassword = dbUri.getUserInfo().split(":").length > 1 
                    ? dbUri.getUserInfo().split(":")[1] 
                    : "";

                builder.url(dbUrl);
                builder.username(dbUser);
                builder.password(dbPassword);
            } catch (Exception e) {
                // Si falla el parsing, usar configuración estándar
                builder.url(jdbcUrl);
                builder.username(username);
                builder.password(password);
            }
        } else {
            // Usar configuración estándar de application.properties
            builder.url(jdbcUrl);
            builder.username(username);
            builder.password(password);
        }

        return builder.build();
    }
}

