import mysql, { Pool } from 'mysql2/promise';
import Logger from './logger';

// TODO: 본인의 DB 계정 입력
const pool: Pool = mysql.createPool({
    host: 'gigl.c6aam9bsw8mj.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    port: 3306,
    password: 'hyunbin7231',
    database: ''
});

export default pool;