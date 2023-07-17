import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateProductUseCase } from '../create-product'

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const usersRepository = new PrismaUsersRepository()

  const createProductUseCase = new CreateProductUseCase(
    productsRepository,
    usersRepository,
  )

  return createProductUseCase
}
