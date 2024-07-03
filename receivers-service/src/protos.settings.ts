import { PRODUCT_PROTO_ENUM } from './models/enums/proto.enum';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ReceiverController } from './controllers';


export const proto = async (app: grpc.Server) => {
    const options = {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true
    }

    const ProductProto = await <any>grpc.loadPackageDefinition(protoLoader.loadSync(process.env.PRODUCT_PATH + PRODUCT_PROTO_ENUM.PRODUCT_PROTO, options));

    await app.addService(ProductProto.ProductService.service, ReceiverController);
}