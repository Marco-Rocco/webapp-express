const connection = require('../data/db')


//mostra tutti gli elementi
function index(req, res) {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'film non trovati' })
        } else {
            res.json(results)
        }
    });
};

//mstra solo elemento desiderato
function show(req, res) {


    const id = parseInt(req.params.id);

    console.log('showing details for movie ' + id);

    const sql = `SELECT 
movies.*, reviews.vote, reviews.text as comment
 FROM
  movies
  JOIN reviews ON reviews.movie_id = movies.id
 WHERE movies.id = ?
`;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'film non trovato' })
        } else {
            res.json(results)
        }
    });
};


module.exports = {
    index,
    show
}


// if (err) return res.status(500).json({ error: 'Film non tovato' });
// res.json(results);



// if (err) return res.status(500).json({ error: 'Database query failed' });
//         if (results.length === 0) return res.status(404).json({ error: 'post not found' });
//         res.json(results[0]);