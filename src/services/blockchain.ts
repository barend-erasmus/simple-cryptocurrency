import { Block } from './../models/block';
import { Transaction } from './../models/transaction';

export class BlockChainService {

    public blocks: Block[];

    constructor() {
        this.blocks = [];
    }

    public createBlockFromTransaction(transaction: Transaction, minerAddress: string): Block {

        if (transaction === null) {
            return new Block(this.blocks.length === 0 ? 1 : this.blocks[this.blocks.length - 1].index + 1, this.blocks.length === 0 ? this.getGenesisBlock().hash : this.blocks[this.blocks.length - 1].hash, null, new Date().getTime(), 0, minerAddress);
        }

        const balance: number = this.computeBalance(transaction.fromAddress, this.blocks);

        if (balance < transaction.amount) {
            return null;
        }

        const block: Block = transaction.toBlock(this.blocks.length === 0 ? 1 : this.blocks[this.blocks.length - 1].index + 1, this.blocks.length === 0 ? this.getGenesisBlock().hash : this.blocks[this.blocks.length - 1].hash, minerAddress);

        return block;
    }

    public addBlock(bits: number, block: Block): void {
        const blocks: Block[] = this.blocks.slice(0);

        blocks.push(block);

        if (this.blocksValid(bits, blocks)) {
            this.blocks = blocks;
        }
    }

    public replaceBlocks(bits: number, blocks: Block[]): void {
        if (this.blocks.length > blocks.length) {
            return;
        }

        if (!this.blocksValid(bits, blocks)) {
            return;
        }

        this.blocks = blocks;
    }

    public getGenesisBlock(): Block {
        const block = new Block(0, 'genesis-block', null, 1510379511, 25173, null);
        block.mine(4);
        return block;
    }

    public validBlockIndex(bits: number, block: Block): boolean {
        if (!block.valid(bits)) {
            return false;
        }

        if (block.index !== (this.blocks.length === 0 ? 1 : this.blocks[this.blocks.length - 1].index + 1)) {
            return true;
        }

        return false;
    }

    public _setBlocksForTesting(minerAddress: string, bits: number, n: number): void {
        const blocks: Block[] = [];

        for (let i = 0; i < n; i++) {
            const block: Block = this.createBlockFromTransaction(null, minerAddress);

            block.mine(bits);

            this.addBlock(bits, block);
        }
    }

    private computeBalance(address: string, blocks: Block[]): number {
        let result = 0;

        for (const block of blocks) {
            if (block.transaction !== null && block.transaction.toAddress === address) {
                result += block.transaction.amount;
            }

            if (block.minerAddress === address) {
                result += 1;
            }
        }

        return result;
    }

    private blocksValid(bits: number, blocks: Block[]): boolean {
        // All blocks should be valid
        for (const block of blocks) {
            if (!block.valid(bits)) {
                return false;
            }
        }

        // Blocks should be valid
        // Previous hash needs to be equal to the previous block hash
        // Timestamp needs to be greater than the previous block timestamp
        // Index needs to be 1 greater then the previous block index
        let previousBlock = this.getGenesisBlock();

        for (let i = 0; i < blocks.length; i++) {

            const block: Block = blocks[i];

            if (block.previousHash !== previousBlock.hash) {
                return false;
            }

            if (block.timestamp <= previousBlock.timestamp) {
                return false;
            }

            if (block.index !== previousBlock.index + 1) {
                return false;
            }

            if (block.transaction !== null) {
                const balance: number = this.computeBalance(block.transaction.fromAddress, blocks.slice(0, i));

                if (balance < block.transaction.amount) {
                    return false;
                }
            }

            previousBlock = block;
        }

        return true;
    }
}