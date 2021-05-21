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
    resetEventListener.add(); // リセットボタンが押されたらリロードする動作を設定
  }

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
const replaceStartToStop = new ReplaceChildElement();
function startBtn() {
  start();
  // スタートからストップへボタンの置き換え
  replaceStartToStop.getParentElement('button-area');
  replaceStartToStop.create('button', 'button', 'stop', 'Stop');
  replaceStartToStop.from('start');
  stopEventListener.add();
  // リセットボタンがある場合は削除する
  const buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) {
    removeElement('reload');
  }
}

// ストップボタンの動作、押されたらストップしてスタートボタンと差し替える
const createChildElement = new CreateChildElement();
const replaceStopToStart = new ReplaceChildElement();
function stop() {
  clearInterval(setIntervalID);
  // ストップからスタートへボタンの置き換え
  replaceStopToStart.getParentElement('button-area');
  replaceStopToStart.create('button', 'button', 'start', 'Start')
  replaceStopToStart.from('stop');
  startEventListener.add();
  // リセットボタン作成
  createChildElement.getParentElement('reset-button');
  createChildElement.create('button', 'button', 'reload', 'Reset');
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