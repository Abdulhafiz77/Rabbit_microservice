import amqplib, { Connection, Channel } from 'amqplib';

class RabbitMQ {
    private static instance: RabbitMQ;
    private connection: Connection;
    private channel: Channel;

    private constructor() {}

    static async getInstance(): Promise<RabbitMQ> {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
            await RabbitMQ.instance.connect();
        }
        return RabbitMQ.instance;
    }

    private async connect() {
        this.connection = await amqplib.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
    }

    async consumeQueue(queue: string, callback: (msg: amqplib.ConsumeMessage | null) => void) {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, callback, { noAck: true });
    }
}

export default RabbitMQ;