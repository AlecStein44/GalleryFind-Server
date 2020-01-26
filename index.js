const express = require('express');
const knex = require('knex')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
const { NODE_ENV } = require('./config')
const { PORT, DB_URL} = require('./config')

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