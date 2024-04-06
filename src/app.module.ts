import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { db } from './db/db.module';
import {ConfigModule} from '@nestjs/config';
import {UserModule} from './users/users.module';
import config from './config';
import * as joi from 'joi';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load:[config],
      isGlobal: true,
      validationSchema: joi.object({}),
    }),
    db,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
