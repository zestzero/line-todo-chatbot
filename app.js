const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send("Hello from container land!");
});

const server = app.listen(process.env.PORT, function () {
  const port = server.address().port;
  console.log('Example app listening at http:/localhost:%s', port);
});