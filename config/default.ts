import dotenv from 'dotenv'
dotenv.config();

export default { 
    port: 1337,
    dbUri: process.env.DATABASE_URI,
    saltWorkFactor: 10, 
}