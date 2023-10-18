/**
 * 连续执行函数interval秒内只执行一次
 * @param {*} fn 要执行的函数
 * @param {*} interval 执行函数的间隔
 * @param {*} leading 第一次触发的函数是否执行
 * @param {*} trailing 最后触发的函数是否执行
 * @returns
 */
export function _throttle(
  fn: any,
  interval: number,
  leading = true,
  trailing = true
) {
  let startTime = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const throttle = function (...args: any) {
    const nowTime = new Date().getTime();

    // 立即执行触发事件
    if (!leading && startTime === 0) {
      startTime = nowTime;
    }

    // 通过上一次触发时间与当前触发时间的间隔，如果这个间隔的时间一旦超过等待的时间那么会立即执行
    const waitTime = interval - (nowTime - startTime);
    if (waitTime <= 0) {
      startTime = nowTime;
      fn(args);
      timer = null;
      return;
    }

    // 函数尾部是否需要执行
    if (trailing && !timer) {
      timer = setTimeout(() => {
        fn(args);
        startTime = new Date().getTime();
        timer = null;
      }, waitTime);
    }
  };

  return throttle;
}
