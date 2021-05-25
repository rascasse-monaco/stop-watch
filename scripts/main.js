'use strict'
import countToTime from './time-handling-util.js';
import {
  EventListener,
  CreateChildElement,
  ReplaceChildElement,
  RemoveElement
} from './dom-util.js';

let backgroundColor;

// 各ボタンへのイベントリスナーの設定
function addEventListerToStart() { // Startボタン
  const addEventListerToStart = new EventListener();
  addEventListerToStart.getId('start');
  addEventListerToStart.add('click', start);
}
function addEventListenerToReset() { // Resetボタン
  localStorage.color = backgroundColor
  const addEventListenerToReset = new EventListener();
  addEventListenerToReset.getId('reload');
  addEventListenerToReset.add('click', reset); // リセットボタンが押されたらリロードする動作を設定
}
function addEventListenerToSetting() { // settingボタン
  const addEventListenerToSetting = new EventListener();
  addEventListenerToSetting.getId('setting');
  addEventListenerToSetting.add('click', createSettings);
}
// StartボタンへEventListenerの設定
addEventListerToStart();

// SettingボタンがあったらEventListnerを設定する
let settingButtonExist = document.getElementById('setting');
if (settingButtonExist) {
  addEventListenerToSetting();
}

// リセットボタンがあったらイベントを設定する
let ResetbuttonExist = document.getElementById('reload') || null;

if (ResetbuttonExist) {
  // ResetボタンへEventListenerの設定
  addEventListenerToReset();
}

// スタートボタンの動作、押されたらスタートしてストップボタンと差し替える
function start() {
  timerStart();
  const settingButtonExist = document.getElementById('setting');
  if (settingButtonExist) {
    const removeElement = new RemoveElement();
    removeElement.remove('setting'); // Settingボタン自身を消去
  }
  // スタートからストップへボタンの置き換え
  const replaceChildElement = new ReplaceChildElement();
  replaceChildElement.getParentElement('button-area');
  replaceChildElement.create('button', 'button', 'stop', 'Stop');
  replaceChildElement.from('start');
  // StopボタンへEventListenerの設定
  const addEventListenerToStop = new EventListener();
  addEventListenerToStop.getId('stop');
  addEventListenerToStop.add('click', stop);
  // リセットボタンがある場合は削除する
  const buttonExisted = document.getElementById('reload') || null;
  if (buttonExisted) {
    const removeElement = new RemoveElement;
    removeElement.remove('reload');
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
  addEventListerToStart();
  // リセットボタン作成
  const createChildElement = new CreateChildElement();
  createChildElement.getParentElement('reset-button');
  createChildElement.create('button', 'button', 'reload', 'Reset');
  // ResetボタンへEventListenerの設定
  addEventListenerToReset();
}
// Settingボタンの動作、押されたらストップしてスタートボタンと差し替える
function createSettings() {
  const replaceChildElement = new ReplaceChildElement();
  const addEventListener = new EventListener();
  const removeElement = new RemoveElement();
  removeElement.remove('setting'); // Settingボタン自身を消去
  // スタートボタンの操作を無効化して色を変える
  replaceChildElement.getParentElement('button-area');
  replaceChildElement.create('button', 'button', 'disable-start', 'Start');
  replaceChildElement.from('start');

  // 背景色を変えるボタンを３つ設置する
  // 透明にするボタン
  const createChildElement = new CreateChildElement();
  createChildElement.getParentElement('setting-area');
  createChildElement.create('button', 'short-button', 'setting-normal-button', 'Normal');
  addEventListener.getId('setting-normal-button');
  addEventListener.add('click', () => {
    // 背景を透明にする
    backgroundColor = 'transparent'
    document.body.style.backgroundColor = backgroundColor;
  })
  // 黒にするボタン
  createChildElement.getParentElement('setting-area');
  createChildElement.create('button', 'short-button', 'setting-black-button', 'Black');
  addEventListener.getId('setting-black-button');
  addEventListener.add('click', () => {
    // 背景を黒にする
    backgroundColor = 'black';
    document.body.style.backgroundColor = backgroundColor;
  })
  // グリーンバックにするボタン
  createChildElement.getParentElement('setting-area');
  createChildElement.create('button', 'short-button', 'setting-green-button', 'Green');
  addEventListener.getId('setting-green-button');
  addEventListener.add('click', () => {
    // 背景をグリーンバックにする
    backgroundColor = 'rgb(0, 255, 0)';
    document.body.style.backgroundColor = backgroundColor;
  })
  // setボタンの設置
  createChildElement.getParentElement('set-button-area');
  createChildElement.create('button', 'button', 'set', 'Set');
  addEventListener.getId('set');
  addEventListener.add('click', () => {
    // setボタン以外を消去してスタートボタンを設置
    // ストップからスタートへボタンの置き換え
    const replaceChildElement = new ReplaceChildElement();
    replaceChildElement.getParentElement('button-area');
    replaceChildElement.create('button', 'button', 'start', 'Start')
    replaceChildElement.from('disable-start');
    // StartボタンへEventListenerの設定
    addEventListerToStart();
    removeElement.removeAllChildren('setting-area');
    removeElement.remove('set');
  })
}

function reset() {
  count = 0;
  timeDisp(); // 時間表示リセット
  const createChildElement = new CreateChildElement();
  const removeElement = new RemoveElement();
  // リセットボタン削除
  removeElement.remove('reload');
   // settingボタンをつくる
  createChildElement.getParentElement('setting-area');
  createChildElement.create('button', 'button', 'setting', 'Color Setting');
  addEventListenerToSetting();
}

let count = 0;
let setIntervalID = null;
// タイマー表示&時間更新用関数
function timerStart() {
  setIntervalID = setInterval(() => {
    count++
    timeDisp();
  }, 100);
}
// 時間表示の部品
function timeDisp() {
  const disp = document.getElementById('sec').innerText =
  `${countToTime(count).sec}.${count.toString().slice(-1)}`
  document.getElementById('min').innerText =
  `${countToTime(count).min}`
  document.getElementById('hour').innerText =
  `${countToTime(count).hour}`;
  return disp;
}