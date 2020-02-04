const { Transform } = require('stream')

class Batch extends Transform {

  constructor(size = 10, expireMs) {
    super({ objectMode: true });

    this.size = size;
    this._length = 0;
    this.batch = []

    this.fn = (batch) => batch;

    if (expireMs) {
      this.setupInterval(expireMs)
    }
  }

  apply(fn) {
    this.fn = fn;
    return this;
  }

  setupInterval(expireMs) {
    const doExpire = () => {
      if (this._length > 0)
        this._push()
    }
    this.interval = setInterval(doExpire, expireMs)
  }

  _push() {
    this.push(this.fn(this.batch));
    this.batch = [];
    this._length = 0;
  }

  _transform(obj, _, cb) {
    this._length++;
    this.batch.push(obj);

    if (this._length >= this.size) {
      this._push();
    } 

    cb();

  }

  _destroy(err, cb) {
    const { interval } = this;

    if (interval) {
      clearInterval(interval)
    }

    cb(err)
  }

  _flush(cb) {
    if (this._length > 0) {
      this._push();
    }
    cb();
  }

}


module.exports = Batch;