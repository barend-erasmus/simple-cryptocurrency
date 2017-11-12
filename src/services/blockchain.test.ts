import { expect } from 'chai';
import 'mocha';

import { BlockChainService } from './blockchain';
import { Block } from './../models/block';

describe('BlockChainService', () => {

    describe('replaceChain', () => {
        it('should replace chain given chain is longer', () => {

            // Arrange
            const blockChainService: BlockChainService = new BlockChainService();

            // Act
            blockChainService.replaceChain(4, [
                new Block(1, '00007f8dfd43df53f91c5cc3bcef259b', null, 1510421229461, 124980, ''),
                new Block(2, '000014ec7be2b400e0a4a988b5857890', null, 1510421229749, 94913, ''),
                new Block(3, '00002551bcaf5c92a12e777ace379419', null, 1510421229972, 56170, ''),
            ]);


            // Assert
            expect(blockChainService.blocks.length).to.be.eq(3);
        });

        it('should not replace chain given chain is shorter', () => {

            // Arrange
            const blockChainService: BlockChainService = new BlockChainService();

            blockChainService.replaceChain(4, [
                new Block(1, '00007f8dfd43df53f91c5cc3bcef259b', null, 1510421229461, 124980, ''),
                new Block(2, '000014ec7be2b400e0a4a988b5857890', null, 1510421229749, 94913, ''),
                new Block(3, '00002551bcaf5c92a12e777ace379419', null, 1510421229972, 56170, ''),
            ]);

            // Act
            blockChainService.replaceChain(4, [
                new Block(1, '00007f8dfd43df53f91c5cc3bcef259b', null, 1510421229461, 124980, ''),
                new Block(2, '000014ec7be2b400e0a4a988b5857890', null, 1510421229749, 94913, ''),
            ]);

            // Assert
            expect(blockChainService.blocks.length).to.be.eq(3);
        });
    });
});