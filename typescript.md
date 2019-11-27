1. 在自己的.d.ts 文件中可以对 ts 系统自带的 interface 进行声明合并(扩展)

```js
// global.d.ts
interface HTMLElement {
  // 进入全屏
  webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>;
  webkitRequestFullScreen(options?: FullscreenOptions): Promise<void>;
  msRequestFullscreen(options?: FullscreenOptions): Promise<void>;
  mozRequestFullScreen(options?: FullscreenOptions): Promise<void>;

  // 监听全屏
  onwebkitfullscreenchange: ((this: Element, ev: Event) => any) | null;
  onmozfullscreenchange: ((this: Element, ev: Event) => any) | null;
  MSFullscreenChange: ((this: Element, ev: Event) => any) | null;
}

interface Document {
  // 当前全屏的元素
  readonly webkitFullscreenElement: Element | null;
  readonly msFullscreenElement: Element | null;
  readonly mozFullScreenElement: Element | null;

  // 退出全屏
  webkitExitFullscreen(): Promise<void>;
  msExitFullscreen(): Promise<void>;
  mozCancelFullScreen(): Promise<void>;
}
```
