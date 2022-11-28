import Redis from 'ioredis'


const redis = new Redis(process.env.Redis_URL!) 

export default redis