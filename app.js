const express = require('express');
const app = express();
const port = process.env.port;
const cors = require('cors');

const moviesRouter = require('./routers/moviesRouter')


app.use(express.json())

app.use(express.static('public'))

app.use(cors({
    origin: process.env.FE_WEBAPP
}))

app.get('/', (req, res) => {
    res.send('benvenuto')
})

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`webapp listening  at port ${port}`)
})