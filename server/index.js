require('dotenv/config');
const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('myImage');

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.use(express.static('./public'));

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
    });
});

app.get('/api/users/:userId', (req, res, next) => {
  db.query('select * from users where "userId" = $1', [req.params.userId])
    .then(result => {
      if (!result.rows[0]) {
        return next(new ClientError(`cannot find product with id ${req.params.userId}`, 404));
      } else {
        res.json(result.rows[0]);
      }
    });
});

app.post('/api/products/', upload, (req, res, next) => {
  if (!req.body.title || !parseInt(req.body.price) || !req.body.description) {
    res.status(400).json({ Error: `Invalid content ${req.file}` });
  }

  const params = [req.body.title, parseInt(req.body.price), req.body.description, '/uploads/' + req.file.filename];

  db.query('insert into products ("title", "price", "description", "image") values ($1, $2, $3, $4)', params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// app.post('/api/user', (req, res, next) => {
//   if (!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.password) {
//     res.status(400).json({ Error: `Invalid content ${req.file}` });
//   }

//   const params = [req.body.firstName, req.body.lastName, req.body.userName, req.body.password];

//   db.query('insert into users (firstName, lastName, userName, password) values ($1, $2, $3, $4)', params)
//     .then(result => {
//       res.status(201).json(result.rows);
//     })
//     .catch(err => {
//       res.status(500).json(err.message);
//     });
// });

app.patch('/api/products/:productid/', (req, res, next) => {
  const params = [req.body.title, parseInt(req.body.price), req.body.description, parseInt(req.params.productid)];

  db.query('update products set "title" = $1, "price" = $2, "description" = $3 where productid = $4', params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

app.delete('/api/products/:productid/', (req, res, next) => {
  const params = [parseInt(req.params.productid)];

  db.query('delete from products where productid = $1', params)
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
