import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../mikro-orm.config';
import { StudentModule } from '../student/student.module';
import { FeedbackModule } from '../Feedback/feedback.module';

@Module({
  imports: [MikroOrmModule.forRoot(config), StudentModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
