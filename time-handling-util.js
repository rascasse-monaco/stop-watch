'use strict';
/**
 * conuntを時間に変換し十の位が0の場合は0を挿入する
 * @param {Number} count 1/10秒のカウント数を入れる。
 * @return {Number} 時、分、秒の値を返す。
 */
function countToTime(count) {
  return {
    sec: Math.floor(count / 10 % 60).toString().padStart(2, '0'),//分を返す60秒になったら0秒にする
    min: Math.floor(count / (60 * 10) % 60).toString().padStart(2, '0'),//60秒毎に分を返す60分になったら0分にする
    hour: Math.floor(count / (60 * 60 * 10) % 24).toString().padStart(2, '0')//60分に時間を返す24時間になったら00時間にする
  }
}

export default countToTime ;