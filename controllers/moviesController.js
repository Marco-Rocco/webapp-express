const connection = require('../data/db');
//operazioni CRUD
//index
function index(req, res) {

    const { find } = req.query

    let sql = `
                SELECT
                    movies.*, ROUND(AVG(reviews.vote), 2) AS average_vote
                FROM
                    movies
                LEFT JOIN
                    reviews ON movies.id = reviews.movie_id
                `;
    if (find) {
        sql += ` WHERE title like "%${find}%" or director like "%${find}%"`
    }

    sql += ` GROUP BY movies.ID`

    connection.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: 'Database connection error'
            })
        }

        res.json(results.map(result => ({
            ...result,
            imagepath: process.env.IMAGE_PATH + result.image
        })));
    })
};
//show
function show(req, res) {

    const { id } = req.params;
    const sql = `SELECT 
                   *
                FROM
                    movies
                WHERE
                    id = ?
                `

    connection.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                errorMessage: err.sqlMessage
            })
        }

        if (results.length === 0) {
            return res.status(404).json({
                errorMessage: 'No records found',
                id
            })
        }

        const currentMovie = results[0];

        const movie = {
            ...currentMovie,
            imagepath: process.env.IMAGE_PATH + currentMovie.image
        }

        const sql = `SELECT 
                        *
                    FROM
                        reviews
                    WHERE
                        movie_id = ?
                    `

        connection.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err);
            }

            movie.reviews = results;

            res.json(movie);
        })
    })
};


//post

function post(req, res) {
    const { id } = req.params;

    const { name, vote, text } = req.body


    res.json(`review created to movie ${id}
        ${name}, ${vote}, ${text},        `)
}

module.exports = { index, show, post };