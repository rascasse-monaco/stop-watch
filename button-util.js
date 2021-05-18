'use strict';

//ボタン表示変更リプレース用関数
function replaceButton(parentElementID, oldChildElementID, createElement, newChildElementID, innerHTMLtext) {
  const parent = document.getElementById(parentElementID);
  const oldChild = document.getElementById(oldChildElementID);
  const newChild = document.createElement(createElement);
  newChild.setAttribute('type', 'button');
  newChild.setAttribute('class', 'button');
  newChild.setAttribute('id', newChildElementID);
  newChild.innerHTML = innerHTMLtext;
       
  parent.replaceChild(newChild, oldChild);
}

// エレメント削除関数
function removeElement(ElementID) {
  const element = document.getElementById(ElementID)
  element.remove();
}

// エレメント(ボタン)作成関数
function makeNewButton(parentElementID, newElement, newElementId, className, innerHTMLText) {
  const parent = document.getElementById(parentElementID);
  const newChild = document.createElement(newElement);
  parent.appendChild(newChild)
  newChild.setAttribute('type', 'button');
  newChild.setAttribute('class', className);
  newChild.setAttribute('id', newElementId);
  newChild.innerHTML = innerHTMLText;
}

//ボタンのaddEventListener設定用関数
function buttonEventListener(ID, event, funcName,) {
  const ButtonID = document.getElementById(ID);
  ButtonID.addEventListener(event, funcName, false);
}

export { replaceButton, buttonEventListener, removeElement, makeNewButton };