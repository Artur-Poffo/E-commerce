import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './create-product'
import { UserNotFoundError } from './errors/user-not-found-error'

let productsRepository: InMemoryProductsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateProductUseCase

describe('Create product use case', async () => {
  beforeEach(async () => {
    productsRepository = new InMemoryProductsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateProductUseCase(productsRepository, usersRepository)
  })

  it('should be possible to create a product', async () => {
    await usersRepository.create({
      id: 'user-1',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
      role: 'SELLER',
    })

    const { product } = await sut.execute({
      name: 'Xbox',
      description: 'description of Xbox',
      price: 1050, // in cents
      coverImageUrl: 'https://...',
      userId: 'user-1',
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be possible to create a product with a inexistent userId', async () => {
    await expect(() =>
      sut.execute({
        name: 'Xbox',
        description: 'description of Xbox',
        price: 1050, // in cents
        coverImageUrl: 'https://...',
        userId: 'inexistent-user',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
