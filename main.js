'use strict'
import countToTime from './time-handling-util.js';
import {
  removeElement,
  EventListener,
  CreateChildElement,
  ReplaceChildElement
} from './dom-util.js';

// 各ボタンへのイベントリスナーの設定
function addEventListerToStartButton() { // Startボタン
  const addEventListerToStartButton = new EventListener();
  addEventListerToStartButton.getId('start');
  addEventListerToStartButton.add('click', start);
}
function addEventListenerToResetButton() { // Resetボタン
  const addEventListenerToResetButton = new EventListener();
  addEventListenerToResetButton.getId('reload');
  addEventListenerToResetButton.add('click', ()=> { location.reload() }); // リセットボタンが押されたらリロードする動作を設定
}

// StartボタンへEventListenerの設定
addEventListerToStartButton();

// リセットボタンがあったらイベントを設定する
let buttonExisted = document.getElementById('reload') || null;

if (buttonExisted) {
  // ResetボタンへEventListenerの設定
  addEventListenerToResetButton();
}

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
function start() {
  timerStart();
  // スタートからストップへボタンの置き換え
  const replaceChildElement = new ReplaceChildElement();
  replaceChildElement.getParentElement('button-area');
  replaceChildElement.create('button', 'button', 'stop', 'Stop');
  replaceChildElement.from('start');
  // StopボタンへEventListenerの設定
  const addEventListenerToStopButton = new EventListener();
  addEventListenerToStopButton.getId('stop');
  addEventListenerToStopButton.add('click', stop);
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
  // StartボタンへEventListenerの設定
  addEventListerToStartButton();
  // リセットボタン作成
  const createChildElement = new CreateChildElement();
  createChildElement.getParentElement('reset-button');
  createChildElement.create('button', 'button', 'reload', 'Reset');
  // ResetボタンへEventListenerの設定
  addEventListenerToResetButton();
}

let count = 0;
let setIntervalID = null;
// タイマー表示&時間更新用関数
function timerStart() {
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