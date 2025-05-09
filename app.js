const express = require('express');
const app = express();
const port = process.env.port;

const moviesRouter = require('./routers/moviesRouter')

app.get('/', (req, res) => {
    res.send('benvenuto')
})

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`webapp listening  at port ${port}`)
})