let car = {
  run(name) {
    console.log(`${name} begin run`);
    return this;
  },
  stop() {
    console.log('stopped!');
  },
};

car.run('奔驰').stop();
