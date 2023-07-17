import { ProductsRepository } from '@/repositories/products-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Product } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found-error'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  price: number
  coverImageUrl?: string
  userId: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private productsRepository: ProductsRepository, private usersRepository: UsersRepository) { }

  async execute({
    name,
    description,
    price,
    coverImageUrl,
    userId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const product = await this.productsRepository.create({
      name,
      description,
      price,
      cover_image_url: coverImageUrl,
      user_id: userId,
    })

    return {
      product,
    }
  }
}
