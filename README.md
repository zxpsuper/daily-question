# 前端每日一题 :books:

## 项目介绍

- 在这里记录着每天自己遇到的一道印象深刻的前端问题，一道生活中随处可见的小问题。

- 强迫自己形成积累的习惯，鞭挞自己不断前行，共同学习。

- 贵在坚持与积累，充电加油只为遇到更好的自己

- 欢迎大家到 Issues 交流，鼓励 PR，感谢 Star、感谢 watch，大家有啥好的建议可以加我微信一起交流讨论！

<img src="./image/wechat.png" style="width: 320px; margin: 0 auto; display: block">

**备注：**

> 在 github 项目的右上角，有三个按钮,分别是 watch、star、fork，新来的同学注意不要用错了，无休止的邮件提醒会给你造成不必要的信息干扰。
>
> 当你选择 Watching，表示你以后会关注这个项目的全部动态，以后只要这个项目发生变动，被别人提交了 pull request、被发起了 issue 等情况你都会收到邮件通知。
>
> star 相当于是点赞或收藏，方便以后查找。
>
> fork 表示你想要补充完善这个项目的内容。

![](./image/fork_and_star.jpg)

## 项目模块

|           模块            | 描述                                         |
| :-----------------------: | :------------------------------------------- |
| [每日一题](./front_end/)  | 记录着自己工作上遇到的前端问题               |
|    [生活一题](./life/)    | 记录着自己生活上遇到的奇奇怪怪形形色色的问题 |
|  [每日一文](./article/)   | 记录着自己工作或者生活上看到的好文           |
| [前端算法](./algorithm//) | 保存着一些前端算法题目及答案                 |

## 最新问题 :question:

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

## 日志 :ledger:

- **2019-03-27** —— 启动 daily-question（前端每日一题项目）

- **2019-12-16** —— 添加 **_前端算法_** 模块

- **2020-01-07** —— 优化项目结构，使其分类清晰，便于阅读

- **2020-01-10** —— 利用 nodejs 为每个分类文件夹自动生成 readme 文件

## 关于作者 :boy:

作者： 小皮咖

Email：zxpscau@163.com

Github: https://github.com/zxpsuper

知乎：https://www.zhihu.com/people/super-32-94-54/activities

掘金：https://juejin.im/user/5af17df4518825672a02e1f5

对内容有任何疑问，欢迎联系我。
