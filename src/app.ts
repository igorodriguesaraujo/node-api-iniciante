import fastify from "fastify";
import cors from '@fastify/cors'
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { signInRoute } from "./http/routes/sign-in";
import { createUserRoute } from "./http/routes/create-user";
import { meRoute } from "./http/routes/me";
import { verifyEmailRoute } from "./http/routes/verify-email";

export const app = fastify()

const prefix = { prefix: '/api/v1' };

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: '*'
})

app.register(createUserRoute, prefix);
app.register(signInRoute, prefix);
app.register(meRoute, prefix);
app.register(verifyEmailRoute, prefix);


