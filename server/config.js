module.exports = {
    adapter: {
        host: '47.90.100.170',
        port: 9999,
        db: 0,
        // auth_pass?: string, 
        password: 'duibuqi55CUOLEYA'
    },
    server: {
        port: 3000,
        serverOptions: {
            /**
             * The path to server the client file to
             * @default '/socket.io'
             */
            // path?: string;
            path: '/game',

            /**
             * Should we serve the client file?
             * @default true
             */
            // serveClient?: boolean;

            /**
             * The adapter to use for handling rooms. NOTE: this should be a class,
             * not an object
             * @default typeof Adapter
             */
            // adapter?: Adapter;

            /**
             * Accepted origins
             * @default '*:*'
             */
            // origins?: string;

            /**
             * How many milliseconds without a pong packed to consider the connection closed (engine.io)
             * @default 60000
             */
            // pingTimeout?: number;

            /**
             * How many milliseconds before sending a new ping packet (keep-alive) (engine.io)
             * @default 25000
             */
            // pingInterval?: number;

            /**
             * How many bytes or characters a message can be when polling, before closing the session
             * (to avoid Dos) (engine.io)
             * @default 10E7
             */
            // maxHttpBufferSize?: number;

            /**
             * A function that receives a given handshake or upgrade request as its first parameter,
             * and can decide whether to continue or not. The second argument is a function that needs
             * to be called with the decided information: fn( err, success ), where success is a boolean
             * value where false means that the request is rejected, and err is an error code (engine.io)
             * @default null
             */
            // allowRequest?: (request:any, callback: (err: number, success: boolean) => void) => void;

            /**
             * Transports to allow connections to (engine.io)
             * @default ['polling','websocket']
             */
            // transports?: string[];

            /**
             * Whether to allow transport upgrades (engine.io)
             * @default true
             */
            // allowUpgrades?: boolean;

            /**
             * parameters of the WebSocket permessage-deflate extension (see ws module).
             * Set to false to disable (engine.io)
             * @default true
             */
            // perMessageDeflate?: Object|boolean;

            /**
             * Parameters of the http compression for the polling transports (see zlib).
             * Set to false to disable, or set an object with parameter "threshold:number"
             * to only compress data if the byte size is above this value (1024) (engine.io)
             * @default true|1024
             */
            // httpCompression?: Object|boolean;

            /**
             * Name of the HTTP cookie that contains the client sid to send as part of
             * handshake response headers. Set to false to not send one (engine.io)
             * @default "io"
             */
            // cookie?: string|boolean;
        }
    }
};