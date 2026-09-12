const mongoose = require('mongoose');

async function createConnection() {
    await mongoose.connect(process.env.MONGO_URI);
}

module.exports = createConnection;