import { SqliteDriver, defineConfig } from '@mikro-orm/sqlite';

import { Logger } from '@nestjs/common';
import { Student } from './student/entities/student.entity';
import { Feedback } from './Feedback/entities/feedback.entity';

const logger = new Logger('MikroORM');

export default defineConfig({
  entities: [Student, Feedback],
  dbName: process.env.MIKRO_ORM_DB_NAME || 'feedback-form-app',
  type: 'sqlite',
  baseDir: __dirname,
  driver: SqliteDriver,
  logger: logger.log.bind(logger),
});
