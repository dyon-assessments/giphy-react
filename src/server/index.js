const express = require('express');
const routes = require('./routes/routes');
const redis = require('redis');
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const client = redis.createClient();
const port = process.env.PORT || 8080;

client.on('error', (err) => {
  console.log("Error " + err);
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('dist'));
app.use(routes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
