import { Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { APIResponse } from 'src/common/helpers/api-response';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';

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

    @Put(':id')
    @ApiBody({type: UpdateUserDto})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ) {
        const result = await this.usersService.updated(id, dto);
        return APIResponse.success(result, `updated successfully`)
    }

}
