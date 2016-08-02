/**
 * Created by elemelyn on 16/7/16.
 */

// 获取当天零点的时间(当前时区)
export function getZeroDate(ts) {
  const current = new Date(ts);
  current.setHours(0);
  current.setMinutes(0);
  current.setSeconds(0);
  current.setMilliseconds(0);

  return current;
}