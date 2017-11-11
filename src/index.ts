import { BlockChainService } from './services/blockchain';
import { Block } from './models/block';
import { Transaction } from './models/transaction';

const ws: any = new WebSocket('ws://localhost:9475');
let blocks: Block[] = null;

ws.onmessage = (event: any) => {

    const json: {
        senderId: string,
        recipentId: string,
        transaction: Transaction,
        block: Block,
        blocks: Block[],
        requestBlocks: boolean,
    } = JSON.parse(event.data);
    

    if (json.requestBlocks) {
        const senderId: string = json.senderId;
        const recipentId: string = json.recipentId;

        console.log('Sending Blocks');
        ws.send(JSON.stringify({
            senderId: recipentId,
            recipentId: senderId,
            transaction: null,
            block: null,
            blocks: blocks === null? [] : blocks,
            requestBlocks: false,
        }));
    }

    if (json.blocks) {
        console.log('Received Blocks');
    }

};

setTimeout(() => {
    console.log('Requesting blocks');
    ws.send(JSON.stringify({
        senderId: null,
        recipentId: null,
        transaction: null,
        block: null,
        blocks: null,
        requestBlocks: true,
    }));
}, 2500);

export { BlockChainService } from './services/blockchain';
export { Block } from './models/block';
export { Transaction } from './models/transaction';