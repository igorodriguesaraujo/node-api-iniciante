import z from "zod/v4"
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

import { createUser } from "../../service/create-user"
import { getUserByEmail } from "../../service/get-user-by-email"

import { generateHash } from "../../utils/hash"
import { sendVerificationEmail } from "../../utils/send-verification-email"

export const createUserRoute: FastifyPluginCallbackZod = async function (app) {
  app.post('/users', {
    schema: {
      body: z.object({
        name: z.string().min(1, { message: 'Campo obrigatório' }),
        email: z.email({ message: 'E-mail inválido' }),
        password: z.string().min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
      })
    }
  }, async (request, reply) => {
    const { name, email, password } = request.body

    const userExists = await getUserByEmail(email)

    if (userExists[0]) {
      return reply.status(400).send({
        error: true,
        message: 'Usuário já cadastrado'
      })
    }

    const hashPassword = await generateHash(password)

    if (!hashPassword) {
      return reply.status(500).send({
        error: true,
        message: 'Falha ao criar usuário'
      })
    }

    const user = await createUser({
      name,
      email,
      password: hashPassword
    })

    if (user[0]) {
      await sendVerificationEmail(user[0]);
    }

    return reply.status(201).send({
      error: false,
      message: 'Usuário cadastrado com sucesso'
    })
  })
}
