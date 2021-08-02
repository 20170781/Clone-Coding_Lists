let todoList: { id: number; title: string; done: boolean }[] = [
  { id: 1, title: "todo 완성", done: false },
  { id: 2, title: "TypeScript 마스터", done: false },
];

const addList = (item: {
  id: number;
  title: string;
  done: boolean;
}): { id: number; title: string; done: boolean }[] => {
  const toDos = [...todoList];
  toDos.push(item);
  return toDos;
};

const deleteList = (
  deleteID: number
): { id: number; title: string; done: boolean }[] => {
  const toDos = todoList.filter(
    (item: { id: number; title: string; done: boolean }) => item.id !== deleteID
  );
  return toDos;
};

const completeList = (
  completeID: number
): { id: number; title: string; done: boolean }[] => {
  const toDos = [...todoList];
  toDos.forEach((item) =>
    item.id === completeID ? (item.done = true) : item.done
  );
  return toDos;
};

const main = document.querySelector("#root");
const inputBox = document.createElement("input");
inputBox.type = "text";
const ulBox = document.createElement("ul");

//생성 (삭제, 성공 버튼 추가)
const makeList = (items: { id: number; title: string; done: boolean }[]) => {
  ulBox.innerHTML = "";
  items.forEach((item: { id: number; title: string; done: boolean }) => {
    const list = document.createElement("li");
    const del = document.createElement("button");
    const chg = document.createElement("button");

    list.innerText = `${item.title}(${item.done ? "O" : "X"})`;

    del.innerText = "삭제"; //삭제버튼
    del.addEventListener("click", () => {
      todoList = deleteList(item.id);
      makeList(todoList);
    });

    chg.innerText = "성공"; //성공버튼
    chg.addEventListener("click", () => {
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
inputBox.addEventListener("change", () => {
  todoList = addList({
    id: todoList[todoList.length - 1].id + 1,
    title: inputBox.value,
    done: false,
  });
  inputBox.value = "";
  makeList(todoList);
});

main?.appendChild(inputBox);
main?.appendChild(ulBox);
