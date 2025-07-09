import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users: User[] = [];
    constructor(private prisma: PrismaService) { }


    async create(data: { username: string; email: string; password: string }) {
        return this.prisma.user.create({ data });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async getAll() {
        return this.prisma.user.findMany();
    }
    async getById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }
    async updated(id: number, data: UpdateUserDto) {
        const user = await this.getById(id); // validasi keberadaan user
        const updateData = { ...data };

        // hash password jika diupdate
        // if (data.password) {
        //     updateData.password = await bcrypt.hash(data.password, 10);
        // }
        return this.prisma.user.update({
            where: { id: user.id },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                name: true,
                bio: true,
                department: true,
                avatarUrl: true,
                instructorTitle: true,
                instructorBio: true,
                createdAt: true,
                updatedAt: true,
            // password dan role tidak disertakan
              },
        });
    }
}
