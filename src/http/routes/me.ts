import z from "zod";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

import { verifyToken } from "../../utils/jwt";

import { getUserById } from "../../service/get-user-by-id";
import { JwtPayload } from "jsonwebtoken";

export const meRoute: FastifyPluginCallbackZod = async function (app) {
  app.get('/auth/me', {
    schema: {
      headers: z.object({
        authorization: z
          .string()
          .min(1, { message: 'Authorization inválido' })
          .startsWith('Bearer ')
      }),
      response: {
        200: z.object({
          error: z.boolean(),
          message: z.string(),
          data: z.object({
            name: z.string(),
            email: z.string(),
          })
        }),
        400: z.object({
          error: z.boolean(),
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { authorization } = request.headers

    const accessToken = authorization.split(' ')[1]

    const { payload } = verifyToken(accessToken) as JwtPayload

    if (!payload) {
      return reply.status(400).send({
        error: true,
        message: 'Token inválido'
      })
    }

    const user = await getUserById(payload)

    return reply.status(200).send({
      error: false,
      message: 'Usuário Autenticado',
      data: user[0]
    })
  }
  )
}