import * as crypto from 'crypto';
import * as NodeRSA from 'node-rsa';

import { Block } from './block';

export class Transaction {

    constructor(
        public fromAddress: string,
        public toAddress: string,
        public amount: number,
        public timestamp: number,
        public signature: string,
    ) {
    }

    public computeSignature(key: string): void {
        const rsa: any = new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----${key}-----END RSA PRIVATE KEY-----`);

        this.signature = rsa.encryptPrivate(`${this.fromAddress}:${this.toAddress}:${this.amount}:${this.timestamp}`).toString('base64');
    }

    public valid(): boolean {
        const rsa: any = new NodeRSA(`-----BEGIN PUBLIC KEY-----${this.fromAddress}-----END PUBLIC KEY-----`);
        let decryptedSignature: string;
        try {
            decryptedSignature = rsa.decryptPublic(Buffer.from(this.signature, 'base64')).toString();
        }catch(err) {
            return false;
        }

        if (decryptedSignature !== `${this.fromAddress}:${this.toAddress}:${this.amount}:${this.timestamp}`) {
            return false;
        }

        return true;
    }

    public toBlock(previousIndex: number, previousHash: string, minerAddress: string): Block {
        return new Block(previousIndex + 1, previousHash, this, new Date().getTime(), 0, minerAddress);
    } 
}