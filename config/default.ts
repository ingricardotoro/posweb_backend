import dotenv from 'dotenv'

dotenv.config();

export default { 
    port: process.env.PORT || 1337,
    dbUri: process.env.DATABASE_URI_DEV,
    saltWorkFactor: 10,
    JwtSecret: process.env.JWT_SECRET 
}