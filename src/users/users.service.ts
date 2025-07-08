import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    private users: User[] = [];
    constructor(private prisma: PrismaService){}

    findAll(): User[] {
        return this.users;
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    async getAllUsers() {
        return this.prisma.user.findMany();
      }

    create(user: User): User {
        this.users.push(user);
        return user;
    }
}
