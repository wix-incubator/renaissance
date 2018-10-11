const express = require('express');
const session = require('express-session');
const renderVM = require('./vm');

const app = express();

// Register an express middleware. Learn more: http://expressjs.com/en/guide/using-middleware.html.
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// Define a route to render our initial HTML.
app.use('/', (req, res) => {
  const html = renderVM();

  res.send(html);
});

// Launch the server
app.listen(process.env.PORT, () => {
  console.info(`Fake server is running on port ${process.env.PORT}`);
});
