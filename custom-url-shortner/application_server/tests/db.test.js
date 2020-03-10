const mongoose = require('mongoose')

afterAll(async () => {
    await mongoose.connection.close();
    expect(mongoose.connection.readyState).toEqual(0);
});

describe('Test availability of the database', () => {
    it('should test the database connection', async () => {
        const config = require('../config/config');
        const url = config.mongoURI;
        await mongoose.connect(url, { 
            keepAlive: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        expect(mongoose.connection.readyState).toEqual(1);
    });
});
