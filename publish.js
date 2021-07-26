var ghpages = require('gh-pages');
ghpages.publish(
  './docs/.vuepress/dist',
  {
    branch: 'gh-pages',
  },
  function(err) {
    if (err) console.log(err)
    else console.log('docs同步完成!');
  }
);
