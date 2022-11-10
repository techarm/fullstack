const fs = require('fs');

fs.readdir('./', (err, fileList) => {
  if (err) return console.log(err);

  fileList.forEach((file) => {
    fs.readFile(file, (err, fileData) => {
      if (err) return console.log(err);

      console.log(`${file}: ${fileData.length}`);
    });
  });

  console.log('done!');
});
