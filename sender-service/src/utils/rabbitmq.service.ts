import amqplib from "amqplib";

export class RabbitMQ {
  private static instance: RabbitMQ;
  private channel: amqplib.Channel;

  private constructor() {}

  static async getInstance() {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
      await RabbitMQ.instance.init();
    }
    return RabbitMQ.instance;
  }

  private async init() {
    const connection = await amqplib.connect(process.env.MSG_BROKER_URL);
    this.channel = await connection.createChannel();
    await this.channel.assertQueue("product_queue", { durable: true });
  }

  async sendToQueue(message: any) {
    this.channel.sendToQueue("product_queue", Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}