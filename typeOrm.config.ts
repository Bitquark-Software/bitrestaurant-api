import { DataSource} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {config} from 'dotenv';

config();

const configService = new ConfigService();
export default new DataSource({
    type: 'mysql',
    url: configService.get('DB_URL'),
    synchronize: false,
    migrations:['src/db/migration/*.ts'],
    migrationsTableName:'migrations',
    entities:['src/users/entities/*.entity.ts.ts']
})
