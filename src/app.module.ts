import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cat.controller';
import { DogsController } from './dogs/dogs.controller';
import { NinjasModule } from './ninjas/ninjas.module';

@Module({
  imports: [NinjasModule],
  controllers: [AppController, DogsController, CatsController],
  providers: [AppService],
})
export class AppModule {}
