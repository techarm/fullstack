const fs = require('fs');

const directoryPath = './';

fs.readdir(directoryPath, (err, fileList) => {
  if (err) return console.log(err);

  console.log(fileList);
});
