'use estrict'


var app = require('./app');


const port = 3000;


app.listen(port, 'localhost', () => {
    console.log(`App listening at http://localhost:${port}`)
});