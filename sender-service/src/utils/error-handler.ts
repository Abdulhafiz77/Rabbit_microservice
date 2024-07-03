import * as grpc from '@grpc/grpc-js';

export const errorHandler = (error, callback) => {
    console.log(error)
    return callback({ code: grpc.status.INTERNAL, message: error as any }, null)

};