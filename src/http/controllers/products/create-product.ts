import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { makeCreateProductUseCase } from '@/use-cases/factories/make-create-product-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    coverImageUrl: z.string().optional(),
  })

  const { name, description, coverImageUrl, price } =
    createProductBodySchema.parse(request.body)

  try {
    const createProductUseCase = makeCreateProductUseCase()

    await createProductUseCase.execute({
      name,
      description,
      coverImageUrl,
      price,
      userId: request.user.id,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
