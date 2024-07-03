import * as grpc from '@grpc/grpc-js';

export const errorHandler = (error: any, callback: grpc.sendUnaryData<any>) => {
    console.error('Error:', error);

    let statusCode = grpc.status.INTERNAL;
    let message = 'Server error';

    if (error) {
        statusCode = grpc.status.NOT_FOUND;
        message = 'This error is found';
    }

    return callback({
        code: statusCode,
        message: message,
    }, null);
};