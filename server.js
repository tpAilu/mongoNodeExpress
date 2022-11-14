if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const connectDB = require('./db/connect')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({
    limit: '10mb',
    extended: false
}))
app.use(express.json())

app.use('/', indexRouter)
app.use('/authors', authorRouter)


// Server
const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URL);
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`)
        });
    } catch (error) {
        console.log(error);
    }
};

start();