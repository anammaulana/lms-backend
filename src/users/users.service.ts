import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private userRepo: UserRepository) { }
    async register(data: { username: string; email: string; password: string }) {
        return this.userRepo.create(data);
    }

    async getAllUsers() {
        return this.userRepo.getAll();
    }

    async getUserById(id: number) {
        return this.userRepo.getById(id);
    }

    async getUserByEmail(email: string) {
        return this.userRepo.findByEmail(email);
    }

    async updateUser(id: number, data: UpdateUserDto) {
        return this.userRepo.updated(id, data);
    }

    async updatePassword(id: number, newPassword: string) {
        const hashed = await bcrypt.hash(newPassword, 10);
        return this.userRepo.updatePassword(id, hashed);
    }

    async getProfile(userId: number) {
        return this.userRepo.getProfile(userId);
      }
}
