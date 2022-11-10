const fs = require('fs').promises;

const fileName = '07-read-file-promises.js';

fs.readFile(fileName)
  .then((data) => console.log(`${fileName}: ${data.length}`))
  .catch((err) => console.error(err));
