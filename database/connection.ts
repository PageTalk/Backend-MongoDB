// Load environment variables
require("dotenv").config();
import mysql, { PoolOptions, RowDataPacket } from 'mysql2';

// Database configuration
const dbConfig: mysql.PoolOptions = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 3306,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
};

// Function to perform a query on the database
export async function queryDatabase(query: string): Promise<RowDataPacket[]> {
    const pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    });
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err);
                return;
            }

            connection.query(
                query,
                (error, results: RowDataPacket[]) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    } else {
                        resolve(results);
                        // console.log(rows)
                        // console.log(results)
                    }
                }
            )
        }) 
    })
}
