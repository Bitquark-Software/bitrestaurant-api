import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    database: {
        dbName: process.env.MYSQL_DB,
        port: parseInt(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
    },
    MYSQL_URL: process.env.DB_URL,
    // jwtSecret: process.env.JWT_KEY,
    // API_KEY: process.env.API_KEY,
}));
