import { Prisma, Product } from '@prisma/client'

import { randomUUID } from 'node:crypto'
import { ProductsRepository } from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  private items: Product[] = []

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product: Product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      cover_image_url: data.cover_image_url || '',
      price: data.price,
      user_id: data.user_id || '',
    }

    this.items.push(product)

    return product
  }
}
