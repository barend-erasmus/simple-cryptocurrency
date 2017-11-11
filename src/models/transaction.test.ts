import { expect } from 'chai';
import 'mocha';

import { Transaction } from './transaction';

describe('Transaction', () => {

    describe('valid', () => {
        it('should return true', () => {

            // Arrange
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                10,
                1510377496,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
            PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
            EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
            2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
            DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
            rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
            BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            // Act
            const result: boolean = transaction.valid();
            
            // Assert
            expect(result).to.be.true;
        });

        it('should return false given toAddress changed', () => {
            
            // Arrange
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                10,
                1510377496,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
            PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
            EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
            2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
            DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
            rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
            BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            transaction.toAddress = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKIBf55vlBfqHoLTmlK/IltdyokxDFoxT6TJkN16+eTDfaM/jf9kfmqCDug0o+lv8lqK0YyINdLBHHlrRSRz20MCAwEAAQ==';

            // Act
            const result: boolean = transaction.valid();
            
            // Assert
            expect(result).to.be.false;
        });

        it('should return false given fromAddress changed', () => {
            
            // Arrange
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                10,
                1510377496,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
            PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
            EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
            2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
            DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
            rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
            BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            transaction.fromAddress = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKIBf55vlBfqHoLTmlK/IltdyokxDFoxT6TJkN16+eTDfaM/jf9kfmqCDug0o+lv8lqK0YyINdLBHHlrRSRz20MCAwEAAQ==';

            // Act
            const result: boolean = transaction.valid();
            
            // Assert
            expect(result).to.be.false;
        });

        it('should return false given amount changed', () => {
            
            // Arrange
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                10,
                1510377496,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
            PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
            EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
            2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
            DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
            rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
            BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            transaction.amount = 200;

            // Act
            const result: boolean = transaction.valid();
            
            // Assert
            expect(result).to.be.false;
        });

        it('should return false given timestamp changed', () => {
            
            // Arrange
            const transaction: Transaction = new Transaction(
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWyPGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQ==',
                'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3dteNqyjJLTHz7EXfofBsnvoe5xa60OIbcPRPeWPIMTaxAxW/LcGugQaQ6Clnf47Q+NGNcKHMdIQZcjZq1eOkCAwEAAQ==',
                10,
                1510377496,
            );

            transaction.computeSignature(`MIIBOgIBAAJBAMJ4EO0RcH+clE2oCGCUcjUcTjBm2S67R8qQ4OBWTBrUCQ0dqvWy
            PGuGY33BPs8hFZB6be6KyfuLzZXH1d2dMDkCAwEAAQJBAIX7tSWwq0KwvZjXWZY5
            EIq5CsHcSmwhCjBtKxJFQsAD+qYHgvj5GCAP9f9QSt/Y1uLJU/oOOLJ98KvYAVjb
            2mUCIQD9F5/+hNYlaHv7b2y9zt+qlYwSjvymSsBQKSwP27BqawIhAMS0BeLSLxTE
            DP9ExhOWiTDnHshNJRasv7OvBLvh4oDrAiBQxCNIo7d7BJbcLDi1cbkqxMKIgZza
            rGwmqJzpCqCHtQIgCunB+deXbRuDbRYvtx5+9guclZhSGnPzHtDy/kmF+4kCIDSR
            BBPDEbeORVOYCIipw7odIRc/b+6upZvHzEMb7suX`);

            transaction.timestamp = new Date().getTime();

            // Act
            const result: boolean = transaction.valid();
            
            // Assert
            expect(result).to.be.false;
        });
    });

});