package de.fhswf.kanbanql.graphql.scalars;

import graphql.schema.GraphQLScalarType;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

/**
 * Defines various additional scalars for the graphql schema. The default generic output types inside the schema can be extended by creating new
 * {@link GraphQLScalarType scalar types} and adding them to this the configuration.
 */
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
