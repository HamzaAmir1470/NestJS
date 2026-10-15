import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('DatabaseService initialized and connected to the database.');
  }

  onApplicationShutdown(signal?: string) {
    this.isConnected = false;
    console.log(
      'DatabaseService disconnected from the database.Signal received:',
      signal,
    );
  }

  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
