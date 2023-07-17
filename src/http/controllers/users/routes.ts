import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  // Auth
  app.post('/auth/signup', register)
  app.post('/auth/signin', authenticate)
}
