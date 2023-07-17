import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { ProductsRepository } from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    })

    return product
  }
}
