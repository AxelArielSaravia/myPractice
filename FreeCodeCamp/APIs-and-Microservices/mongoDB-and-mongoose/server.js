'use estrict'

const app = require('./app');

const port = 3000;

const listen = app.listen(port, 'localhost', () => {
    console.log(`App listening at http://localhost:${port}`)
});