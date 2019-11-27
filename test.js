const EventEmitter = require('./EventEmitter');

let bus = new EventEmitter();
bus.on('haha', function(name, super2) {
  console.log(name, super2);
  console.log(this._event);
});

bus.emit('haha', 'xiaopika', '2');
