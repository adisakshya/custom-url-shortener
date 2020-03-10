/**
 * Setup Database
 */
const setupDB = require('../test-setup/setup');
setupDB();

describe('Sample Test', () => {
    it('is a sample test that must pass', async () => {
        expect(true).toEqual(true);
    });
});