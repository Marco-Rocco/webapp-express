const express = require('express');
const router = express.Router();


const functions = require('../controllers/moviesController')

//otteniamo i movies
router.get('/', functions.index);

//ottieni post desiderato
router.get('/:id', functions.show);

//posta review
router.post('/:id/reviews', functions.post)

module.exports = router;


