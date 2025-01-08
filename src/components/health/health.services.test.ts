import { expect } from 'chai';
import { getHealthStatus } from './health.services';

describe('Health Services', function () {
    describe('getHealthStatus', function () {
        it('Should respond successfully', async function () {
            const response = await getHealthStatus();
            expect(response).to.deep.include({ app: 200, be: 200, arq: 200 });
        });
    });
});
