import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [];

    findAll(): User[] {
        return this.users;
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    create(user: User): User {
        this.users.push(user);
        return user;
    }
}
