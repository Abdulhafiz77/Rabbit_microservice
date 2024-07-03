import { createClient } from 'redis';

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis client connected'));
redisClient.on('ready', () => console.log('Redis client ready to use'));
redisClient.on('end', () => console.log('Redis client disconnected'));

const handleExitSignals = async () => {
    process.on('SIGINT', async () => {
        console.log('Received SIGINT. Disconnecting Redis client.');
        await redisClient.quit();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('Received SIGTERM. Disconnecting Redis client.');
        await redisClient.quit();
        process.exit(0);
    });
};

handleExitSignals();

export default redisClient;