'use strict'
import countToTime from './time-handling-util.js';
import { replaceButton, buttonEventListener } from './button-util.js';

// EventListenerの設定
buttonEventListener('start', 'click', startBtn);
buttonEventListener('reload', 'click', ()=> { location.reload() }); // リセットボタンが押されたらリロード

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
function startBtn() {
  start();
  replaceButton('button', 'start','button', 'stop', 'Stop');
  buttonEventListener('stop', 'click', stop);
}

// ストップボタンの動作、押されたらストップしてスタートボタンと差し替える
function stop() {
  clearInterval(setIntervalID);
  replaceButton('button', 'stop','button', 'start', 'Start');
  buttonEventListener('start', 'click', startBtn);
}

let count = 0;
let setIntervalID = null;
// タイマー表示&時間更新用関数
function start() {
  setIntervalID = setInterval(() => {
    count++
    document.getElementById('sec').innerText =
    `${countToTime(count).sec}.${count.toString().slice(-1)}`
    document.getElementById('min').innerText =
    `${countToTime(count).min}`
    document.getElementById('hour').innerText =
    `${countToTime(count).hour}`
  }, 100);
}