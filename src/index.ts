import { BlockChainService } from './services/blockchain';
import { Block } from './models/block';
import { Transaction } from './models/transaction';

const ws: any = new WebSocket('ws://localhost:9475');

const minerAddress: string = generateAddress();

const blockChainService: BlockChainService = new BlockChainService();

ws.onmessage = (event: any) => {

    const json: {
        senderId: string,
        recipentId: string,
        transaction: Transaction,
        block: Block,
        blocks: Block[],
        requestBlocks: boolean,
    } = JSON.parse(event.data);

    console.log(json);

    if (json.requestBlocks) {
        const senderId: string = json.senderId;
        const recipentId: string = json.recipentId;

        // console.log('Sending Blocks');
        ws.send(JSON.stringify({
            senderId: recipentId,
            recipentId: senderId,
            transaction: null,
            block: null,
            blocks: blockChainService.blocks === null ? [] : blockChainService.blocks,
            requestBlocks: false,
        }));
    }

    if (json.blocks) {
        // console.log('Received Blocks');
        blockChainService.replaceChain(4, json.blocks.map((x) => new Block(
            x.index,
            x.previousHash,
            x.transaction ?
                new Transaction(x.transaction.fromAddress, x.transaction.toAddress, x.transaction.amount, x.transaction.timestamp, x.transaction.signature) :
                null,
            x.timestamp,
            x.nonce,
            x.minerAddress
        )));
    }

    if (json.block) {
        // console.log('Received Block');
        blockChainService.addBlock(4, new Block(
            json.block.index,
            json.block.previousHash,
            json.block.transaction ?
                new Transaction(json.block.transaction.fromAddress, json.block.transaction.toAddress, json.block.transaction.amount, json.block.transaction.timestamp, json.block.transaction.signature) :
                null,
            json.block.timestamp,
            json.block.nonce,
            json.block.minerAddress
        ));

        if (blockChainService.shouldRequestNewChain(4, new Block(
            json.block.index,
            json.block.previousHash,
            json.block.transaction ?
                new Transaction(json.block.transaction.fromAddress, json.block.transaction.toAddress, json.block.transaction.amount, json.block.transaction.timestamp, json.block.transaction.signature) :
                null,
            json.block.timestamp,
            json.block.nonce,
            json.block.minerAddress
        ))) {
            // console.log('Requesting blocks');
            ws.send(JSON.stringify({
                senderId: null,
                recipentId: null,
                transaction: null,
                block: null,
                blocks: null,
                requestBlocks: true,
            }));
        }
    }

    if (json.transaction) {
        // console.log('Received Transaction');
        const block: Block = blockChainService.createBlockFromTransaction(new Transaction(json.transaction.fromAddress, json.transaction.toAddress, json.transaction.amount, json.transaction.timestamp, json.transaction.signature), minerAddress);
        block.mine(4);

        blockChainService.addBlock(4, block);

        // console.log('Sending Block');
        ws.send(JSON.stringify({
            senderId: null,
            recipentId: null,
            transaction: null,
            block: block,
            blocks: null,
            requestBlocks: false,
        }));
    }

};

setTimeout(() => {
    // console.log('Requesting blocks');
    ws.send(JSON.stringify({
        senderId: null,
        recipentId: null,
        transaction: null,
        block: null,
        blocks: null,
        requestBlocks: true,
    }));
}, 2500);

setInterval(() => {

    console.log(blockChainService.blocks.length);

    // console.log('Received Transaction');
    const block: Block = blockChainService.createBlockFromTransaction(null, minerAddress);
    block.mine(4);

    blockChainService.addBlock(4, block);

    // console.log('Sending Block');
    ws.send(JSON.stringify({
        senderId: null,
        recipentId: null,
        transaction: null,
        block: block,
        blocks: null,
        requestBlocks: false,
    }));
}, 10000);

function generateAddress(): string {
    let text: string = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export { BlockChainService } from './services/blockchain';
export { Block } from './models/block';
export { Transaction } from './models/transaction';