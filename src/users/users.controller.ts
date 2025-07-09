import { BadRequestException, Body, Controller, Get, Logger, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { APIResponse } from 'src/common/helpers/api-response';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    private readonly logger = new Logger(UsersController.name);

    @Get()
    async getAll() {
        const result = await this.usersService.getAllUsers();
        // this.logger.log('Data Berhasil di Ambil...')
        return APIResponse.success(result, 'get data successfuly')
    }

    @Put(':id')
    @ApiBody({type: UpdateUserDto})
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto,
    ) {
        const result = await this.usersService.updateUser(id, dto);
        return APIResponse.success(result, `updated successfully`)
    }

    @Put(':id/change-password')
    async changePassword(
        @Param('id') id: string,
        @Body() dto: ChangePasswordDto,
    ) {
        const user = await this.usersService.getUserById(+id);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isMatch) {
            throw new BadRequestException('Old password is incorrect');
        }

        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

        const result = await this.usersService.updatePassword(+id, hashedPassword);

        return APIResponse.success('Password updated successfully')
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user.userId;
        const result = await this.usersService.getProfile(userId);

        return APIResponse.success(result, 'Get Profile successfully');
    }
    
}
