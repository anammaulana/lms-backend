
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from "class-validator";


// enum Role {
//     USER = 'USER',
//     ADMIN = 'ADMIN',
//     INSTRUCTOR = 'INSTRUCTOR',
// }
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({example: 'username'})
    username?: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty({ example: 'email' })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'name' })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'bio' })
    bio?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'department' })
    department?: string;

    @IsOptional()
    @IsUrl()
    @ApiProperty({ example: 'avarar url' })
    avatarUrl?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'instructor title' })
    instructorTitle?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'instructo bio' })
    instructorBio?: string;

    // @IsOptional()
    // @IsString()
    // password?: string;

    // @IsOptional()
    // @IsEnum(Role)
    // @ApiProperty({ example: 'Role' })
    // role?: Role;
}
