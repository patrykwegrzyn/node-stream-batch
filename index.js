class Batch extends Transform {

  constructor(size = 10, interval) {

    super({ objectMode: true });

    this.size = size;
    this._length = 0;
    this.batch = []

    this.fn = (batch) => batch;

    if (interval) {
      this.setupInterval(interval)
    }
  }

  apply(fn) {
    this.fn = fn;
    return this;
  }

  setupInterval(intervalMs) {
    this.interval = setInterval(() => {
      if (this._length > 0) {
        this._push()
      }
    }, intervalMs)
  }

  _push() {
    this.push(this.fn(this.batch));
    this.batch = [];
    this._length = 0;
  }

  _transform(chunk, encoding, callback) {
    this._length++
    if (this._length <= this.size) {
      this.batch.push(chunk)
    } else {
      this._push()
    }

    callback()
  }

  _destroy(err, cb) {
    const { interval } = this;
    if (interval) {
      clearInterval(interval)
    }

    cb()

  }
}


module.exports = Batch;