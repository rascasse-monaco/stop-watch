'use strict'
import countToTime from './time-handling-util.js';
import {
  removeElement,
  EventListener,
  CreateChildElement,
  ReplaceChildElement
} from './button-util.js';

// 各ボタンのEventListenerの設定
const startEventListener = new EventListener('start', 'click', startBtn);
const stopEventListener = new EventListener('stop', 'click', stop);
const resetEventListener = new EventListener('reload', 'click', ()=> { location.reload() });

startEventListener.add();

let buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) { // リセットボタンがあったらイベントを設定する
    resetEventListener.add(); // リセットボタンが押されたらリロード
  }

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
const replaceStartToStop = new ReplaceChildElement('start-button', 'button', 'stop', 'button', 'Stop', 'start');
function startBtn() {
  start();
  replaceStartToStop.replace();
  stopEventListener.add();

  const buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) { // リセットボタンがあったら削除する
    removeElement('reload');
  }
}

// ストップボタンの動作、押されたらストップしてスタートボタンと差し替える
const createChildElement = new CreateChildElement('reset-button', 'button', 'reload', 'button', 'Reset');
const replaceStopToStart = new ReplaceChildElement('start-button', 'button', 'start', 'button', 'start', 'stop');
function stop() {
  clearInterval(setIntervalID);
  replaceStopToStart.replace();
  startEventListener.add();
  createChildElement.create();
  resetEventListener.add();
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