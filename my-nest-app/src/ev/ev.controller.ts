import { Controller, Get } from '@nestjs/common';
import { EvService } from './ev.service.js';

@Controller('ev')
export class EvController {
  constructor(private readonly evService: EvService) {}

  @Get()
  getUrl() {
    return {
      url: this.evService.getUrl(),
      message: 'EV data retrieved successfully',
    };
  }
}
