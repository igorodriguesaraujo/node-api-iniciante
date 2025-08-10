import { FastifyInstance } from "fastify"

export const removeUsersRoute = async function (app: FastifyInstance) {
  app.delete('/user/:id', (request, reply) => {
    return reply.status(204)
  })
}