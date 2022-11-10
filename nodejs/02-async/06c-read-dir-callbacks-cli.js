const fs = require('fs');
const path = require('path');

const targetDirectory = process.argv[2] || './';

getFileLengths(targetDirectory, function (err, results) {
  if (err) return console.log(err);

  results.forEach(([file, length]) => console.log(`${file}: ${length}`));
  console.log('done!');
});

function getFileLengths(dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) callback(err);

    const filePaths = files.map((file) => path.join(dir, file));

    mapAsync(filePaths, readFile, callback);
  });
}

function readFile(file, callback) {
  fs.readFile(file, function (err, fileData) {
    if (err) {
      if (err.code === 'EISDIR') return callback(null, [file, 0]);
      return callback(err);
    }
    callback(null, [file, fileData.length]);
  });
}

function mapAsync(arr, fn, onFinish) {
  let prevError;
  let nRemaining = arr.length;
  const results = [];

  arr.forEach(function (item, i) {
    fn(item, function (err, data) {
      if (prevError) return;

      if (err) {
        prevError = err;
        return onFinish(err);
      }

      results[i] = data;

      nRemaining--;
      if (!nRemaining) onFinish(null, results);
    });
  });
}
