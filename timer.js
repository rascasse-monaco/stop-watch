'use strict'
import countToTime from './time-handling-util.js';
import {
  replaceButton,
  removeElement,
  makeNewButton,
  EventListener
} from './button-util.js';

// 各ボタンのEventListenerの設定
const startEventListener = new EventListener('start', 'click', startBtn);
const stopEventListener = new EventListener('stop', 'click', stop);
const resetEventListener = new EventListener('reload', 'click', ()=> { location.reload() });

startEventListener.set();

let buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) { // リセットボタンがあったらイベントを設定する
    resetEventListener.set(); // リセットボタンが押されたらリロード
  }

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
function startBtn() {
  start();
  replaceButton('start-button', 'start', 'button', 'stop', 'Stop');
  stopEventListener.set();

  const buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) { // リセットボタンがあったら削除する
    removeElement('reload');
  }
}

// ストップボタンの動作、押されたらストップしてスタートボタンと差し替える
function stop() {
  clearInterval(setIntervalID);
  replaceButton('start-button', 'stop','button', 'start', 'Start');
  startEventListener.set();
  makeNewButton('reset-button', 'button', 'reload', 'button', 'Reset');
  resetEventListener.set();
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