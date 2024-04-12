const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let locationData = {};

app.post('/data', (req, res) => {
  locationData = req.body;
  console.log(locationData);
  res.send('Location data received');
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/location', (req, res) => {
  res.json(locationData);
});

// Define the port the server will listen on
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
