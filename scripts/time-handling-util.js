'use strict';
// 値を受け取って値を文字列にしてかえす。返す際に一桁の場合は十の位に0を入れる。
function culcTime(value) {
  return Math.floor(value).toString().padStart(2, '0');
}
/**
 * conuntを時間に変換し十の位が0の場合は0を挿入する
 * @param {Number} count 1/10秒のカウント数を入れる。
 * @return {Number} 時、分、秒の値を返す。
 */
function countToTime(count) {
  return {
    sec: culcTime(count / 10 % 60),//分を返す60秒になったら0秒にする
    min: culcTime(count / (60 * 10) % 60),//60秒毎に分を返す60分になったら0分にする
    hour: culcTime(count / (60 * 60 * 10) % 24)//60分に時間を返す24時間になったら00時間にする
  }
}

export default countToTime ;