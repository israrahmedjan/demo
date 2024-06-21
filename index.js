const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World file can be ABCD EFGH');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
