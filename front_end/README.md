# 前端每日一题

在这里记录着每天自己遇到的一道前端问题。

## 分类

- [2019 年度](./2019)
- [vue 系列](./vue)
- [浏览器相关问题](./浏览器)
- [css](./css)
- [javascript 基础](./javascript)
- [es6 相关](./es6)

## 最新问题

### **2019/10/21 - 2019/10/27** :watch:

---

- git 缓存 git stash 的用法？

  <details>
  <summary>点击</summary>

  （1）git stash save "save message" : 执行存储时，添加备注，方便查找，只有 git stash 也要可以的，但查找时不方便识别。

  （2）git stash list ：查看 stash 了哪些存储

  （3）git stash show ：显示做了哪些改动，默认 show 第一个存储,如果要显示其他存贮，后面加 stash@{\$num}，比如第二个 git stash show stash@{1}

  （4）git stash show -p : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show stash@{\$num} -p ，比如第二个：git stash show stash@{1} -p

  （5）git stash apply :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 stash@{0}，如果要使用其他个，git stash apply stash@{\$num} ， 比如第二个：git stash apply stash@{1}

  （6）git stash pop ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应 stash 删除，并将对应修改应用到当前的工作目录下,默认为第一个 stash,即 stash@{0}，如果要应用并删除其他 stash，命令：git stash pop stash@{\$num} ，比如应用并删除第二个：git stash pop stash@{1}

  （7）git stash drop stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储

  （8）git stash clear ：删除所有缓存的 stash

  </details>

* 如何将 IP 转化为二进制？如何将二进制转化为 ip?

* 怎么将 cookie 中 httponly 属性设置为 true

  `response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly");`

* 移动端的 ios 安卓兼容问题
