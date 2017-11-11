import { Block } from './../models/block';
import { Transaction } from './../models/transaction';

export class BlockChainService {

    public createBlock(transaction: Transaction, blocks: Block[], minerAddress: string): Block {

        if (transaction === null) {
            return new Block(blocks[blocks.length - 1].hash, null, new Date().getTime(), 0, minerAddress);
        }

        const balance: number = this.computeBalance(transaction.fromAddress, blocks);

        if (balance < transaction.amount) {
            return null;
        }

        const block: Block = transaction.toBlock(blocks[blocks.length - 1].hash, minerAddress);

        return block;
    }

    public canAddBlock(block: Block, blocks: Block[]): boolean {
        if (!block.valid) {
            return false;
        }

        if (block.transaction === null) {
            return true;
        }

        const balance: number = this.computeBalance(block.transaction.fromAddress, blocks);

        if (balance < block.transaction.amount) {
            return false;
        }

        return true;
    }

    public computeBalance(address: string, blocks: Block[]): number {
        let result = 0;

        for (const block of blocks) {
            if (block.transaction !== null && block.transaction.toAddress === address) {
                result += block.transaction.amount;
            }
        }

        return result;
    }

    public isChainValid(bits: number, blocks: Block[]): boolean {
        // All blocks should be valid
        for (const block of blocks) {
            if (!block.valid(bits)) {
                return false;
            }
        }

        // Chain should be valid
        // Previous hash needs to be equal to the previous block hash
        // Timestamp needs to be greater than the previous block timestamp
        let previousBlock = this.getGenesisBlock();

        for (const block of blocks) {

            if (block.previousHash !== previousBlock.hash) {
                return false;
            }

            if (block.timestamp <= previousBlock.timestamp) {
                return false;
            }

            previousBlock = block;
        }

        return true;
    }

    public getGenesisBlock(): Block {
        const block = new Block("0", null, 1510379511, 25173, null);
        block.computeHash(4);
        return block;
    }
}