/**
 * File Metadata Microservice
 * 
 * You can submit a form that includes a file upload.
 * The form file input field has the name attribute set to upfile.
 * When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
*/

const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config()

const app = express();


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use( function( req, res, next ){
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), ( req, res ) => {
  //console.log(req.file)
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Your app is listening on port ' + port));