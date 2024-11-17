import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async chunkPdf(@Body() body: { file: string }): Promise<string> {
    const result = await this.appService.processFile(body);
    return result;
  }
}
