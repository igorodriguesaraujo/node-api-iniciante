import { FastifyInstance } from "fastify"

export const updateUsersRoute = async function (app: FastifyInstance) {
  app.put('/user/:id', (request, reply) => {
    return reply.status(204)
  })
}