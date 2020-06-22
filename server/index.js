const express = require('express')
const cors = require('cors')
const router = require('./src/router.js')

var app = express();

app.use(express.json());
app.use(cors())

router(app) 

app.listen(7001, () => {
    console.log('Server is up to running on 7001 port');
});