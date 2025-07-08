import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }



    async register(dto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        try {
            const user = await this.usersService.create({
                username: dto.username,
                email: dto.email,
                password: hashedPassword,
            });

            return {
                id: user.id,
                email: user.email,
            };
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                const target = (error.meta?.target as string[]) || [];
                if (target.includes('email')) {
                    throw new ConflictException('Email already exists');
                }
                if (target.includes('username')) {
                    throw new ConflictException('Username already exists');
                }
                throw new ConflictException('User already exists');
            }

            throw error;
        }
  }
    

    async login(dto: LoginDto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordMatch = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            user: user,
            access_token: token 
        };
    }
}
