require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
// const { Client } = require('pg');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  db.query('select * from products')
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productid', (req, res, next) => {
  db.query('select * from products where productid = $1', [req.params.productid])
    .then(result => {
      if (!result.rows[0]) {
        return next(new ClientError(`cannot find product with id ${req.params.productid}`, 404));
      } else {
        res.json(result.rows[0]);
      }
    }
    );
});

app.post('/api/products/', (req, res, next) => {

  if (!req.body.title || !parseInt(req.body.price) || !req.body.description || !req.body.image) {
    res.status(400).json({ Error: 'Invalid content' });
  }

  const params = [req.body.title, parseInt(req.body.price), req.body.description, req.body.image];

  db.query('insert into products ("title", "price", "description", "image") values ($1, $2, $3, $4)', params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
