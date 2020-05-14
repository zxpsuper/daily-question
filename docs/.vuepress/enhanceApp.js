let APlayer = document.createElement('script');
APlayer.setAttribute(
  'src',
  'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
);
let APlayerCss = document.createElement('link');
APlayerCss.setAttribute('rel', 'stylesheet');
APlayerCss.setAttribute(
  'href',
  'https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css'
);

let Meting = document.createElement('script');
Meting.setAttribute('src', 'https://unpkg.com/meting@1.2/dist/Meting.min.js');
let playerDom = document.createElement('div');
playerDom.setAttribute('id', 'aplayer');
playerDom.setAttribute('class', 'aplayer');
playerDom.setAttribute('data-id', '630710167');
playerDom.setAttribute('data-lrctype', '1');
playerDom.setAttribute('data-server', 'netease');
playerDom.setAttribute('data-type', 'playlist');
playerDom.setAttribute('data-fixed', 'true');
playerDom.setAttribute('data-listfolded', 'true');

document.getElementsByTagName('body')[0].appendChild(playerDom);
document.getElementsByTagName('head')[0].appendChild(APlayer);
document.getElementsByTagName('head')[0].appendChild(Meting);
document.getElementsByTagName('head')[0].appendChild(APlayerCss);
Meting.onload = function() {
  loadMeting();
};
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {};
