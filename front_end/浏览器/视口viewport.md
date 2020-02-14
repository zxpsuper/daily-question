## 视口 viewport

**视口分为：layout viewport -- 布局视口，visual viewport -- 视觉视口，ideal viewport -- 理想视口**

如果把移动设备上浏览器的可视区域设为 viewport 的话，某些网站就会因为 viewport 太窄而显示错乱，所以这些浏览器就决定默认情况下把 viewport 设为一个较宽的值，比如 980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。这个浏览器默认的 viewport 叫做 layout viewport。这个 layout viewport 的宽度可以通过 document.documentElement.clientWidth 来获取。

layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个 visual viewport 来代表浏览器可视区域的大小。visual viewport 的宽度可以通过 window.innerWidth 来获取

ideal viewport 即每个设备完美适配的视口。所谓的完美适配指的是，第一不需要用户缩放和横向滚动条就能正常的查看网站的所有内容；第二是无论文字，图片等在不同的设备都能显示出差不多的效果。ideal viewport 并没有一个固定的尺寸，不同的设备拥有有不同的 ideal viewport。

**mata 标签与 viewport 的关系**

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
/>
```

移动设备默认的是 layout viewport , 但是我们需要的是 ideal viewport, 那么通过 meta 标签的作用就是：让当前 viewport 的宽度等于设备的宽度，同时不允许用户手动缩放。

**meta 标签中 content 的属性和值如下：**

- width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"

- initial-scale 设置页面的初始缩放值，为一个数字，可以带小数

- minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数

- maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数

- height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用

- user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许
