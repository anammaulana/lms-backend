import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    private users: User[] = [];
    constructor(private prisma: PrismaService){}


    async create(data: { username: string; email: string; password: string }) {
        return this.prisma.user.create({ data });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
