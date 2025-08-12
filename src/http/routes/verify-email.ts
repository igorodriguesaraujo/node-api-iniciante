import { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { getUserById } from "../../service/get-user-by-id";
import { db } from "../../db";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";

export const verifyEmailRoute: FastifyPluginCallbackZod = async function (app) {
  app.get('/auth/verify-email', {
    schema: {
      querystring: z.object({
        token: z.string()
      })
    }
  }, async (request, reply) => {
    const { token } = request.query

    const user = await getUserById(token)

    if (!user[0]) {
      return reply.status(400).send({
        error: true,
        message: 'Usuário não encontrado'
      })
    }

    await db.update(users).set({
      email_verified: true
    }).where(eq(users.id, user[0].id))

    return reply.status(200).send({
      error: false,
      message: 'Usuário verificado com sucesso'
    })
  })
} 