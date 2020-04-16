var fs = require('fs');
var origin = './front_end/2019';
var target = './docs/front-end';
var configfile = './docs/.vuepress/config.js';
var config = require('./docs/.vuepress/config');
var copy = function(src, dst) {
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function(path) {
    if (path === 'README.md') return;
    var _src = src + '/' + path;
    var _dst = dst + '/' + path;
    fs.stat(_src, function(err, stats) {
      //stats  该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) {
        //如果是个文件则拷贝
        let contentText = fs.readFileSync(_src);
        fs.writeFileSync(_dst, '# ' + path.slice(0, -3) + '\n\n' + contentText);
        // let readable = fs.createReadStream(_src); //创建读取流
        // let writable = fs.createWriteStream(_dst); //创建写入流
        // readable.pipe(writable);
      } else if (stats.isDirectory()) {
        //是目录则 递归
        checkDirectory(_src, _dst, copy);
      }
    });
  });
};

var checkDirectory = function(src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, err => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
  });
};

var changeConfig = function() {
  let paths = fs.readdirSync(origin); //同步读取当前目录
  let arr = [];
  paths.forEach(function(path) {
    if (path === 'README.md') return;
    arr.push('/front-end/' + path);
  });
  config.themeConfig.sidebar['/front-end/'] = arr;
  fs.writeFileSync(configfile, 'module.exports = ' + JSON.stringify(config));
};
// 先拷贝文件夹
checkDirectory(origin, target, copy);
changeConfig();
