import { BlockChainService } from './services/blockchain';
import { Block } from './models/block';
import { Transaction } from './models/transaction';

import * as WebSocket from 'ws';
import * as uuid from 'uuid';

const wsServer = new WebSocket.Server({ port: 9475 });

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