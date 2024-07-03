import * as grpc from '@grpc/grpc-js';
import { ErrorEnum, ProductModel } from '../models';
import { ProductRepository } from '../repository';
import { RabbitMQ, errorHandler } from '../utils';
import redisClient from '../utils/redis.service';

export const ProductController = {
    getAll: async (params: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<ProductModel[]>) => {
        try {
            const limit = params.request.limit || 10;
            const offset = params.request.offset || 0;

            const productKeys = await redisClient.keys('product:*');
            const products: ProductModel[] = [];

            for (let i = offset; i < offset + limit && i < productKeys.length; i++) {
                const productData = await redisClient.get(productKeys[i]);
                if (productData) {
                    products.push(JSON.parse(productData));
                }
            }

            if (!products || products.length === 0) {
                return callback({ code: grpc.status.NOT_FOUND, message: 'No products found' }, null);
            }

            return callback(null, products);
        } catch (error) {
            return errorHandler(error, callback);
        }
    },
    create: async (params: grpc.ServerUnaryCall<ProductModel, any>, callback: grpc.sendUnaryData<ProductModel>) => {
        try {
            const data = await ProductRepository.create(params.request);
            if (!data) {
                return callback({ code: grpc.status.NOT_FOUND, message: ErrorEnum.UserNotFound }, null);
            }

            const rabbitMQ = await RabbitMQ.getInstance();
            await rabbitMQ.sendToQueue(data);

            return callback(null, data);
        } catch (error) {
            return errorHandler(error, callback);
        }
    }
};