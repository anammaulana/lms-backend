import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @ApiProperty({example: 'Old Password'})
    oldPassword: string;

    @IsString()
    @MinLength(6)
    @ApiProperty({example: 'New Password'})
    newPassword: string;
}
