const { Readable } = require('stream')
const Batch = require('./index');

const readable = Readable.from([1, 2, 3, 4, 5])
const batch = new Batch(2);

const sum = (arr) => arr.reduce((sum, x) => sum + x);
batch.apply(sum)

readable.pipe(batch).on('data', res => {
  console.log(res)
})