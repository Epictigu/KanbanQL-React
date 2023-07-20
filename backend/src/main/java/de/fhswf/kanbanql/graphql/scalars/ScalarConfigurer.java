package de.fhswf.kanbanql.graphql.scalars;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
@Configuration
public class ScalarConfigurer {

    private final TimestampScalar timestampScalar;

    public ScalarConfigurer() {
        this.timestampScalar = new TimestampScalar();
    }

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return wiringBuilder -> wiringBuilder
                .scalar(timestampScalar.timeStampScalarType());
    }
}
