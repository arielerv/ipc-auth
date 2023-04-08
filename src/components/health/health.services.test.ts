import { expect } from 'chai';
import { getHealthStatus } from './health.services';

describe('Health Services', function () {
    describe('getHealthStatus', function () {
        it('Should respond successfully', function () {
            const response = getHealthStatus();
            expect(response).to.deep.include({ status: 200 });
        });
    });
});
