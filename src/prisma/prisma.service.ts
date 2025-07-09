import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Connected to the database boss');
        } catch (err) {
            this.logger.error('Failed to connect to the database boss');
            // process.exit(1); // Optional: keluarin app kalau koneksi gagal
          }
    }
    
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Disconnected from the database');
    }
}
