import * as crypto from 'crypto';
import { Transaction } from './transaction';

export class Block {
    public hash: string;

    constructor(
        public previousHash: string,
        public transaction: Transaction,
        public timestamp: number,
        public nonce: number,
        public minerAddress: string,
    ) {

    }

    public valid(bits: number): boolean {

        this.computeHash(bits);

        // Hash should start with bits of zeros
        if (!this.hash.startsWith(this.generatePartialPreImage(bits))) {
            return false;
        }

        // Transaction should be valid
        if (this.transaction !== null && !this.transaction.valid()) {
            return false;
        }

        // Timestamp should be greater than transaction timestamp
        if (this.transaction !== null && this.timestamp <= this.transaction.timestamp) {
            return false;
        }

        return true;
    }

    public computeHash(bits: number): void {
        this.hash = this.hashAlgorithm(`${bits}:${this.previousHash}:${this.transaction === null? 'null' : this.transaction.signature}:${this.timestamp}:${this.minerAddress}:${this.nonce}`);
    }

    public mine(bits: number): void {
        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) { 
            this.nonce = i;       
            this.computeHash(bits);

            if (this.hash.startsWith(this.generatePartialPreImage(bits))) {
                break;
            }
        }
    }

    private generatePartialPreImage(bits: number): string {
        let str: string = '';

        for (let i = 0; i < bits; i++) {
            str += '0';
        }

        return str;
    }

    private hashAlgorithm(value: string): string {
        return crypto.createHash('md5').update(value).digest("hex");
    }
}