import 'dotenv/config';
import * as Joi from 'joi';

const envSchema = Joi.object({
    PORT: Joi.number().default(3000),
    }).unknown(true);

    const { error, value: envVars } = envSchema.validate(process.env);

    if (error) {
    throw new Error(`Config validation error: ${error.message}`);
    }

    export const envs = {
    port: envVars.PORT,
};
