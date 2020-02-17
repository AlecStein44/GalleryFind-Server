const express = require('express');
const knex = require('knex')
const morgan = require('morgan')
const cors = require('cors');
const bodyParser= require('body-parser')
const multer = require('multer');
const formidable = require('formidable')
const cloudinary = require('cloudinary')
const { NODE_ENV } = require('./config')
const { PORT, DB_URL, CLOUDINARY_URL } = require('./config')
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

app.get('/artistpro', (req, res) => {
    db
        .select('*')
        .from('profiles')
        .where({type: 'artist'})
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })
    
})

app.get('/gallerypro', (req, res) => {
    db
        .select('*')
        .from('profiles')
        .where({type: 'gallery'})
        .then(data => {
           return (
                res.json(data),
                console.log(data)
           )
        })
    
})

app.post('/signup', (req, res) => {
    const form = new formidable.IncomingForm();


    form.on('fileBegin', function (name, file){
        file.path = './public/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    form.parse(req, function(err, fields, files) {
        console.log(files)
        console.log(fields)
        let status = 400;
          db('userdata')
              .insert([
                {
                    email: fields.email,
                    username: fields.username,
                    password: fields.password
                }
            ])
            .then(results => {
                return res.json(results)
            })
            .catch(error => {
            return res.json(error)
            })
    })
})
