# Node stream batch

## Installation


```sh
npm install patrykwegrzyn/node-stream-batch --save
```

## Usage example

```javascript

/**
* @param {number} size
* @param {number} [expireMs]
*/

new Batch(size, expireMs);
```

Predictable source of the fixed length 

```javascript
const readable = Readable.from([1,2,3,4,5])
const batch = new Batch(2);

readable.pipe(batch).on('data', res => {
  // [ 1, 2 ] [ 3, 4 ] [ 5 ]
})
```

Batch can be transofremd via `.apply()` function 

```javascript
const sum = (arr) => arr.reduce((sum, x) => sum + x);
batch.apply(sum)

readable.pipe(batch).on('data', res => {
  // 3, 7, 5
})

```

 Active sources can not be controlled and are unpredictable batch can be emitted on interval by setting `expireMs`

```javascript
const batch = new Batch(100, 2000);

activeSource.pipe(batch)

//batch will trigger after 100 objects collected or every 2s

```