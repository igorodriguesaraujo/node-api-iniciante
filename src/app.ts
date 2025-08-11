import fastify from "fastify";
import cors from '@fastify/cors'
import { createUserRoute } from "./http/routes/create-user";
import { getUsersRoute } from "./http/routes/get-users";
import { updateUsersRoute } from "./http/routes/update-user";
import { removeUsersRoute } from "./http/routes/remove-user";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export const app = fastify()

const prefix = { prefix: '/api/v1' };

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: '*'
})

app.register(createUserRoute, prefix);
app.register(getUsersRoute, prefix);
app.register(updateUsersRoute, prefix);
app.register(removeUsersRoute, prefix);

