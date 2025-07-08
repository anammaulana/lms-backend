import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // <-- WAJIB! Agar bisa dipakai modul lain
})
export class UsersModule { }
