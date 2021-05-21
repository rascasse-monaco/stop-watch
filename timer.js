'use strict'
import countToTime from './time-handling-util.js';
import {
  removeElement,
  EventListener,
  CreateChildElement,
  ReplaceChildElement
} from './html-util.js';

// 各ボタンのEventListenerの設定
const startEventListener = new EventListener('start', 'click', startBtn);
startEventListener.add();

// リセットボタンがあったらイベントを設定する
let buttonExisted = document.getElementById('reload') || null;
if (buttonExisted) {
  const resetEventListener = new EventListener('reload', 'click', ()=> { location.reload() });
  resetEventListener.add(); // リセットボタンが押されたらリロードする動作を設定
}

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
function startBtn() {
  start();
  const replaceChildElement = new ReplaceChildElement();
  // スタートからストップへボタンの置き換え
  replaceChildElement.getParentElement('button-area');
  replaceChildElement.create('button', 'button', 'stop', 'Stop');
  replaceChildElement.from('start');
  const stopEventListener = new EventListener('stop', 'click', stop);
  stopEventListener.add();
  // リセットボタンがある場合は削除する
  const buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) {
    removeElement('reload');
  }
}

// ストップボタンの動作、押されたらストップしてスタートボタンと差し替える
function stop() {
  clearInterval(setIntervalID);
  // ストップからスタートへボタンの置き換え
  const replaceChildElement = new ReplaceChildElement();
  replaceChildElement.getParentElement('button-area');
  replaceChildElement.create('button', 'button', 'start', 'Start')
  replaceChildElement.from('stop');
  const startEventListener = new EventListener('start', 'click', startBtn);
  startEventListener.add();
  // リセットボタン作成
  const createChildElement = new CreateChildElement();
  createChildElement.getParentElement('reset-button');
  createChildElement.create('button', 'button', 'reload', 'Reset');
  const resetEventListener = new EventListener('reload', 'click', ()=> { location.reload() });
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