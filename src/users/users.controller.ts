import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() user: User) {
        return this.usersService.create(user);
    }
}
