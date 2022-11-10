function mapSync(arr, fn) {
  const results = [];

  arr.forEach(function (item, i) {
    const data = fn(item);
    results[i] = data;
  });

  return results;
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
