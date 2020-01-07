## 使用 CSS 绘制几何图形（圆形、三角形、扇形、菱形等）

```css
/* 圆形 */
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: blue;
}
/* 三角形 */
.triangle {
  width: 0;
  height: 0;
  border: 50px solid blue;
  /* 通过改变边框颜色，可以改变三角形的方向 */
  border-color: blue transparent transparent transparent;
}
/* 扇形，扇形是由一个圆形和一个矩形进行组合得到的，用矩形遮住圆形的一部分就形成了扇形。 */
.sector {
  width: 142px;
  height: 142px;
  background: #fff;
  border-radius: 50%;
  background-image: linear-gradient(to right, transparent 50%, #655 0);
}

.sector::before {
  content: '';
  display: block;
  margin-left: 50%;
  height: 100%;
  width: 100%;
  background-color: inherit;
  transform-origin: left;
  /*调整角度，改变扇形大小*/
  transform: rotate(230deg);
}
/* 菱形 */
.rhombus {
  width: 200px;
  height: 200px;
  transform: rotateZ(45deg) skew(30deg, 30deg);
  background: blue;
}
```