import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html>
        <head><title>LMS SERVICE</title></head>
        <body>
          <h1>Ini RestFul API LMS Service</h1>
           <p>Dokumentasi API: <a href="/api-docs">Klik di sini</a></p>
        </body>
      </html>
    `;
  }
}

