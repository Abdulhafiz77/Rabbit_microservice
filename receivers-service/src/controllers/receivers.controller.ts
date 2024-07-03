import { ConsumeMessage } from 'amqplib';
import { ProductModel } from '../models';
import { ProductRepository } from '../repository';
import redisClient from '../utils/redis.service';
import RabbitMQ from '../utils/rabbit.service';
import { errorHandler } from '../utils';

const BATCH_SIZE = 10;

const processBatch = async (batch: ProductModel[]) => {
    for (const product of batch) {
        try {
            await ProductRepository.update(product);
            await redisClient.set(`product:${product.id}`, JSON.stringify(product));
            console.log('Product updated and cached:', product);
        } catch (error) {
            console.error('Error updating and caching product:', error);
            errorHandler(error, (code, message) => {
                console.error('Error processing product:', message);
            });
        }
    }
};

export const ReceiverController = {
    startConsumer: async () => {
        try {
            await redisClient.connect();
            const rabbitMQ = await RabbitMQ.getInstance();
            let batch: ProductModel[] = [];

            const handleMessage = async (msg: ConsumeMessage) => {
                if (msg) {
                    const product: ProductModel = JSON.parse(msg.content.toString());
                    batch.push(product);

                    if (batch.length >= BATCH_SIZE) {
                        await processBatch(batch);
                        batch = [];
                    }
                }
            };

            rabbitMQ.consumeQueue('product_queue', async (msg: ConsumeMessage | null) => {
                if (msg) {
                    await handleMessage(msg);
                }
            });
        } catch (error) {
            console.error('startConsumer error:', error);
            errorHandler(error, (code, message) => {
                console.error('Error starting consumer:', message);
            });
        }
    }
};

ReceiverController.startConsumer().catch(console.error);