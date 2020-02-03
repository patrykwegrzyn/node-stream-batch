# Node stream batch

## Installation


```sh
npm install patrykwegrzyn/node-stream-batch --save
```

## Usage example

```javascript

/**
* @param {number} size
* @param {number} [expire]
*/

new Batch(size , expire);

const readable = Readable.from([1,2,3,4])
const batch = new Batch(2);

readable.pipe(batch).on('data', b => {
  //[1,2]
})

const sum = (arr) => arr.reduce((sum, x) => sum + x);
batch.apply(sum)

readable.pipe(batch).on('data', b => {
  //3
})




```