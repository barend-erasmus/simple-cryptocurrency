import { BlockChainService } from './services/blockchain';
import { Block } from './models/block';
import { Transaction } from './models/transaction';

import * as http from "http";
import * as path from 'path';
import * as uuid from 'uuid';
import * as yargs from 'yargs';

import * as WebSocket from 'ws';

import * as express from 'express';
import * as cors from 'cors';
import * as exphbs from 'express-handlebars';

const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocket.Server({ port: 9472 });

const clients = {};

wsServer.on('connection', (ws) => {
    const id: string = uuid.v4();

    clients[id] = ws;

    ws.on('message', (data: string) => {
        const json: {
            senderId: string,
            recipentId: string,
            transaction: Transaction,
            block: Block,
            blocks: Block[],
            requestBlocks: boolean,
        } = JSON.parse(data);

        if (json.requestBlocks) {
            const recipentId: string = Object.keys(clients).filter((x) => x !== id).find((x) => clients[x].readyState === WebSocket.OPEN);

            if (recipentId) {
                json.senderId = id;
                json.recipentId = recipentId;
                clients[recipentId].send(JSON.stringify(json));
            }
        } else if (json.senderId && json.recipentId) {
            clients[json.recipentId].send(JSON.stringify(json));
        } else {
            wsServer.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        }
    });
});

const argv = yargs.argv;

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req: express.Request, res: express.Response) => {
    res.render('home');
});

httpServer.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});