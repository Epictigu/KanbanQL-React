package de.fhswf.kanbanql.graphql.scalars;

import graphql.schema.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;
import java.text.SimpleDateFormat;
import java.util.Locale;

/**
 * A basic timestamp scalar, as by default graphql doesn't support date and time formats. As a date format can contain time as well as the date
 * itself, this scalar works by converting a simple date into its string form.
 */
@Component
public class TimestampScalar {

    @Bean
    public GraphQLScalarType timeStampScalarType() {
        return GraphQLScalarType.newScalar()
                .name("Timestamp")
                .description("Scalar type for timestamp object types")
                .coercing(new Coercing<>() {
                    @Override
                    public Object serialize(@Nonnull Object input) throws CoercingSerializeException {
                        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX", Locale.ENGLISH);
                        return formatter.format(input);
                    }

                    @Nonnull
                    @Override
                    public Object parseValue(@Nonnull Object input) throws CoercingParseValueException {
                        return input;
                    }

                    @Nonnull
                    @Override
                    public Object parseLiteral(@Nonnull Object input) throws CoercingParseLiteralException {
                        return input.toString();
                    }
                })
                .build();
    }
}
