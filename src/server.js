const app = require('./app');
const createDBConnection = require('../db/dbconfig');

const PORT = process.env.PORT || 3000;

createDBConnection()
    .then((con) => app.listen(PORT))
    .catch((err) => console.log(err))