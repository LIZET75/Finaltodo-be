//DATABASE CONNECTION
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: {
        rejectUnauthorized: false // Note: Setting this to false is insecure for production environments
    }
});

export default pool;