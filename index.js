const fs = require('fs');

function writeReadmeFile(path) {
  var readDir = fs.readdirSync(path);
  let content = readDir.reduce(function(result, item) {
    if (item !== 'README.md') {
      result = result + '- [' + item.slice(0, -3) + '](./' + item + ')\n\n';
    }
    return result;
  }, '');
  fs.writeFile(path + '/README.md', content, err => {
    if (err) throw err;
    console.log(`成功写入` + path + '/README.md文件');
  });
}
[
  './front_end/浏览器',
  './front_end/css',
  './front_end/es6',
  './front_end/javascript',
  './front_end/vue',
  './algorithm',
].forEach(function(item) {
  writeReadmeFile(item);
});
