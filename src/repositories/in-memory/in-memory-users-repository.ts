import { Prisma, User } from '@prisma/client'

import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: data.id || randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role || 'BUYER',
    }

    this.items.push(user)

    return user
  }
}
