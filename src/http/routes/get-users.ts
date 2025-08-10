import { FastifyInstance } from "fastify"

export const getUsersRoute = async function (app: FastifyInstance) {
  app.get('/user', (request, reply) => {
    return reply.status(200)
  })
}