import { expect } from 'chai';
import 'mocha';

import { Block } from './block';
import { Transaction } from './transaction';

describe('Block', () => {

    describe('valid', () => {
        it('should return true', () => {

            // Arrange
            const block: Block = new Block(0, "0", null, new Date().getTime(), 0, null);
            block.mine(4);

            // Act
            const result: boolean = block.valid(4);

            // Assert
            expect(result).to.be.true;
        });

        it('should return true given valid transaction', () => {

            // Arrange
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

            const block: Block = new Block(0, "0", transaction, new Date().getTime(), 0, null);
            block.mine(4);

            // Act
            const result: boolean = block.valid(4);

            // Assert
            expect(result).to.be.true;
        });

        it('should return false given invalid transaction', () => {

            // Arrange
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

            transaction.amount = 200;

            const block: Block = new Block(0, "0", transaction, new Date().getTime(), 0, null);
            block.mine(4);

            // Act
            const result: boolean = block.valid(4);

            // Assert
            expect(result).to.be.false;
        });

        it('should return false given block includes newer transactions', () => {

            // Arrange
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

            const block: Block = new Block(0, "0", transaction, new Date().getTime() - 1000, 0, null);
            block.mine(4);

            // Act
            const result: boolean = block.valid(4);

            // Assert
            expect(result).to.be.false;
        });

        it('should return false given incorrect nonce', () => {

            // Arrange
            const block: Block = new Block(0, "0", null, new Date().getTime(), 4444, null);

            // Act
            const result: boolean = block.valid(4);

            // Assert
            expect(result).to.be.false;
        });
    });
});