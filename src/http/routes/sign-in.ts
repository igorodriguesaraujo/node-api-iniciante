import z from "zod/v4"
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

import { getUserByEmail } from "../../service/get-user-by-email"

import { compareHash } from "../../utils/hash"
import { generateToken } from "../../utils/jwt"

export const signInRoute: FastifyPluginCallbackZod = async function (app) {
  app.post('/auth/sign-in', {
    schema: {
      body: z.object({
        email: z.email({ message: 'E-mail inválido' }),
        password: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
      })
    }
  }, async (request, reply) => {
    const { email, password } = request.body

    const user = await getUserByEmail(email)
    const userExists = user[0];

    if (!userExists) {
      return reply.status(400).send({
        error: true,
        message: 'Usuário não encontrado'
      })
    }

    const userPasswordHash = user[0].password

    const hashPassword = await compareHash(password, userPasswordHash)

    if (!hashPassword) {
      return reply.status(400).send({
        error: true,
        message: 'senha incorreta'
      })
    }

    const access_token = await generateToken(user[0].id)

    return reply.status(200).send({
      error: false,
      message: 'Usuário logado com sucesso',
      data: {
        name: user[0].name,
        email: user[0].email,
      },
      access_token,
    })
  })
}
