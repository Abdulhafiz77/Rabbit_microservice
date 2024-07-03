import * as grpc from '@grpc/grpc-js';
import { proto } from '.';

class ServerModule {

    private readonly host;
    private readonly port;
    
    constructor() {
        this.host = process.env.HOST;
        this.port = process.env.PORT
        this.start();
    }

    private async start() {
        const server = new grpc.Server();
        try {
            await proto(server);
        }
        catch (e) {
            console.log(e);
        }
        server.bindAsync(
            `${this.host}:${this.port}`,
            grpc.ServerCredentials.createInsecure(),
            (err: Error | null, port: number) => {
                if (err) {
                    console.error(`Server error: ${err.message}`);
                } else {
                    console.log(`Server running at http://${this.host}:${this.port}`);
                    server.start()
                }
            }
        );

    }

}

new ServerModule();