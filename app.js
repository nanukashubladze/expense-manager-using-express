const express = require('express');

const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`app started at localhost${port}`)

})