import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { APIResponse } from 'src/common/helpers/api-response';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    private readonly logger = new Logger(UsersController.name);

    @Get()
    async getAll() {
        const result = await this.usersService.getAll();
        // this.logger.log('Data Berhasil di Ambil...')
        return APIResponse.success(result, 'get data successfuly')
    }

}
