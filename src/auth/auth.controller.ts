import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { APIResponse } from '../common/helpers/api-response';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiBody({ type: RegisterDto })
    async register(@Body() dto: RegisterDto) {
        const result = await this.authService.register(dto);
        return APIResponse.success(result, 'User registered successfully');
    }

    @Post('login')
    @ApiBody({ type: LoginDto })
    async login(@Body() dto: LoginDto) {
        try {
            const result = await this.authService.login(dto);
            return APIResponse.success(result, 'Login successful');
        } catch (err) {
            if (err instanceof UnauthorizedException) {
                return APIResponse.error(err.message, 401);
            }

            return APIResponse.error('Internal server error');
        }
    }

}
