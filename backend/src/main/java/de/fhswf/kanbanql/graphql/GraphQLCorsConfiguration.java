package de.fhswf.kanbanql.graphql;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Nonnull;

/**
 * A default cors configuration used to enable requests from other origins. In a production environment, a proper authentication system with spring
 * security should be implemented, but for such a development prototype this basic configuration fulfills its duty. Also, as after building the
 * application, the frontend and backend run on the same port, other origins are no longer needed. Therefore, this configuration is currently limited
 * to the development profile and is not used on the actual built profile.
 */
@Configuration
@Profile("dev")
public class GraphQLCorsConfiguration {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@Nonnull CorsRegistry registry) {
                registry.addMapping("/graphql/**")
                        .allowedOrigins(CorsConfiguration.ALL)
                        .allowedHeaders(CorsConfiguration.ALL)
                        .allowedMethods(CorsConfiguration.ALL);
            }
        };
    }
}
