'use strict';

//ボタンのaddEventListener設定用クラス
class EventListener {
  constructor(Id, event, funcName) {
    this.Id = Id;
    this.event = event;
    this.funcName = funcName;
  }
  add(){
    const buttonId = document.getElementById(this.Id);
    buttonId.addEventListener(this.event, this.funcName, false);
  }
}

// 子要素作成クラス
class CreateChildElement {
  constructor(parentElementId, newElement, newElementId, newElementClassName, innerHTMLText) {
    this.parentElementId = parentElementId;
    this.newElement = newElement;
    this.newElementId = newElementId;
    this.newElementClassName = newElementClassName;
    this.innerHTMLText = innerHTMLText;
  }
  create(){
    const parent = document.getElementById(this.parentElementId);
    const newChild = document.createElement(this.newElement);
    parent.appendChild(newChild);
    newChild.setAttribute('type', this.newElement);
    newChild.setAttribute('class', this.newElementClassName);
    newChild.setAttribute('id', this.newElementId);
    newChild.innerHTML = this.innerHTMLText;
  }
}

//子要素リプレース用関数
class ReplaceChildElement extends CreateChildElement {
  constructor(parentElementId, newElement, newElementId, newElementClassName, innerHTMLText, oldChildElementId) {
    super(parentElementId, newElement, newElementId, newElementClassName, innerHTMLText);
    this.oldChildElementId = oldChildElementId;
  }
  replace(){
    const parent = document.getElementById(this.parentElementId);
    const newChild = document.createElement(this.newElement);
    const oldChild = document.getElementById(this.oldChildElementId);

    parent.appendChild(newChild);
    newChild.setAttribute('type', this.newElement);
    newChild.setAttribute('class', this.newElementClassName);
    newChild.setAttribute('id', this.newElementId);
    newChild.innerHTML = this.innerHTMLText;
  
    parent.replaceChild(newChild, oldChild);
  }
}

// エレメント削除関数
function removeElement(ElementID) {
  const element = document.getElementById(ElementID)
  element.remove();
}

export { removeElement, EventListener, CreateChildElement, ReplaceChildElement };