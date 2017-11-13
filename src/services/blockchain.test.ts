import { expect } from 'chai';
import 'mocha';

import { BlockChainService } from './blockchain';
import { Block } from './../models/block';
import { Transaction } from './../models/transaction';

describe('BlockChainService', function () {
    this.timeout(5000);

    describe('replaceBlocks', () => {
        it('should replace chain given chain is longer', () => {

            // Arrange
            const blockChainService1: BlockChainService = new BlockChainService();
            blockChainService1._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 2);

            const blockChainService2: BlockChainService = new BlockChainService();
            blockChainService2._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 5);

            // Act
            blockChainService1.replaceBlocks(4, blockChainService2.blocks);

            // Assert
            expect(blockChainService1.blocks.length).to.be.eq(5);
        });

        it('should not replace chain given chain is shorter', () => {

            // Arrange
            const blockChainService1: BlockChainService = new BlockChainService();
            blockChainService1._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 5);

            const blockChainService2: BlockChainService = new BlockChainService();
            blockChainService2._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 2);

            // Act
            blockChainService1.replaceBlocks(4, blockChainService2.blocks);

            // Assert
            expect(blockChainService1.blocks.length).to.be.eq(5);
        });
    });

    describe('createBlockFromTransaction', () => {

        it('should return block given transaction null', () => {

            // Arrange
            const blockChainService: BlockChainService = new BlockChainService();

            blockChainService._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 5);

            // Act
            const result: Block = blockChainService.createBlockFromTransaction(null, 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==');

            // Assert
            expect(result).to.be.not.null;
        });

        it('should return block given transaction with sufficient funds', () => {

            // Arrange
            const blockChainService: BlockChainService = new BlockChainService();

            blockChainService._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 5);

            // Act
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                1,
                new Date().getTime(),
                null,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
            PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
            EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
            2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
            DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
            rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
            BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            const result: Block = blockChainService.createBlockFromTransaction(transaction, 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==');

            // Assert
            expect(result).to.be.not.null;
        });

        it('should return null given transaction with insufficient funds', () => {

            // Arrange
            const blockChainService: BlockChainService = new BlockChainService();

            blockChainService._setBlocksForTesting('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==', 4, 5);

            // Act
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                10,
                new Date().getTime(),
                null,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
                    PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
                    EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
                    2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
                    DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
                    rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
                    BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            const result: Block = blockChainService.createBlockFromTransaction(transaction, 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==');

            // Assert
            expect(result).to.be.null;
        });

    });
});