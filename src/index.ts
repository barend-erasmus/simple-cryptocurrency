import * as NodeRSA from 'node-rsa';
import { BlockChainService } from './services/blockchain';
import { Block } from './models/block';
import { Transaction } from './models/transaction';

const ws: any = new WebSocket(`ws://130b7tenrj8gxi2l2t4f.openservices.co.za:9472`);

export const minerAddress: string = generateAddress();
export const bits: number = 2;

export const blockChainService: BlockChainService = new BlockChainService();

ws.onopen = () => {
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
    
        // console.log('Received Transaction');
        const block: Block = blockChainService.createBlockFromTransaction(null, minerAddress);
        block.mine(bits);
    
        blockChainService.addBlock(bits, block);
    
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
};

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
        blockChainService.replaceChain(bits, json.blocks.map((x) => new Block(
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
        blockChainService.addBlock(bits, new Block(
            json.block.index,
            json.block.previousHash,
            json.block.transaction ?
                new Transaction(json.block.transaction.fromAddress, json.block.transaction.toAddress, json.block.transaction.amount, json.block.transaction.timestamp, json.block.transaction.signature) :
                null,
            json.block.timestamp,
            json.block.nonce,
            json.block.minerAddress
        ));

        if (blockChainService.shouldRequestNewChain(bits, new Block(
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
        block.mine(bits);

        blockChainService.addBlock(bits, block);

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

function generateAddress(): string {

    let publicKey: string = getCookie('cryptocurrency-public');

    if (publicKey) {
        return publicKey;
    }

    const rsa: any = new NodeRSA({ b: 512 });

    const privateKey: string = rsa.exportKey('private');
    publicKey = rsa.exportKey('public');

    setCookie('cryptocurrency-public', publicKey.substring(26, publicKey.length - 25).replace(/\n/g, ''), undefined);
    setCookie('cryptocurrency-private', privateKey.substring(31, privateKey.length - 29).replace(/\n/g, ''), undefined);

    return publicKey;
}

function setCookie(cname: string, cvalue: string, exdays: number) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export { BlockChainService } from './services/blockchain';
export { Block } from './models/block';
export { Transaction } from './models/transaction';