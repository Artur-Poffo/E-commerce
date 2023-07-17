import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createProduct } from './create-product'

export async function productsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { onRequest: [verifyJwt, verifyUserRole('SELLER')] },
    createProduct,
  )
}
