import { FastifyInstance } from "fastify"

export const createUserRoute = async function (app: FastifyInstance) {
  app.post('/user', (request, reply) => {
    return reply.status(201)
  })
}
