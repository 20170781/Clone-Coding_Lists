"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
var todoList = [
  { id: 1, title: "todo 완성", done: false },
  { id: 2, title: "TypeScript 마스터", done: false },
];
var addList = function (item) {
  var toDos = __spreadArray([], todoList);
  toDos.push(item);
  return toDos;
};
var deleteList = function (deleteID) {
  var toDos = todoList.filter(function (item) {
    return item.id !== deleteID;
  });
  return toDos;
};
var completeList = function (completeID) {
  var toDos = __spreadArray([], todoList);
  toDos.forEach(function (item) {
    return item.id === completeID ? (item.done = true) : item.done;
  });
  return toDos;
};
var main = document.querySelector("#root");
var inputBox = document.createElement("input");
inputBox.type = "text";
var ulBox = document.createElement("ul");
//생성 (삭제, 성공 버튼 추가)
var makeList = function (items) {
  ulBox.innerHTML = "";
  items.forEach(function (item) {
    var list = document.createElement("li");
    var del = document.createElement("button");
    var chg = document.createElement("button");
    list.innerText = item.title + "(" + (item.done ? "O" : "X") + ")";
    del.innerText = "삭제"; //삭제버튼
    del.addEventListener("click", function () {
      todoList = deleteList(item.id);
      makeList(todoList);
    });
    chg.innerText = "성공"; //성공버튼
    chg.addEventListener("click", function () {
      todoList = completeList(item.id);
      makeList(todoList);
    });
    ulBox.appendChild(list);
    ulBox.appendChild(del);
    ulBox.appendChild(chg);
  });
};
makeList(todoList);
//추가
inputBox.addEventListener("change", function () {
  todoList = addList({
    id: todoList[todoList.length - 1].id + 1,
    title: inputBox.value,
    done: false,
  });
  inputBox.value = "";
  makeList(todoList);
});
main === null || main === void 0 ? void 0 : main.appendChild(inputBox);
main === null || main === void 0 ? void 0 : main.appendChild(ulBox);
//# sourceMappingURL=app.js.map
