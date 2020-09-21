const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".done");

const TODOS_LS = "toDos";
const DONETODO = "doneTodo"
let toDos = [];
let doneTodo = [];

function plusDone(event, text) {
    const li = document.createElement("li");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const btn = event.target;
    const doneId = parseInt(btn.parentNode.id);
    doneBtn.addEventListener("click",deleteDone);
    for (let i = 0; i < JSON.parse(localStorage.getItem("toDos")).length; i++) {
        if (JSON.parse(localStorage.getItem("toDos"))[i].id == doneId) {
            text = JSON.parse(localStorage.getItem("toDos"))[i].text;
            //이벤트가 일어난 버튼 부모요소의 아이디-1의 인덱스 요소
        }
    }
    const delLi = btn.parentNode;
    toDoList.removeChild(delLi);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(delLi.id);
    });
    toDos = cleanToDos;
    doneBtn.innerText = "DONE";
    span.innerText = text;
    li.appendChild(doneBtn);
    doneBtn.classList.add("done_btn");
    li.appendChild(span);
    li.id = doneId;
    doneList.appendChild(li); // done 목록 li 생성
    const doneObj = {
        text: text,
        id: doneId
    };
    doneTodo.push(doneObj);
    saveToDos();
    saveDone();
}

function paintDone(text) {
    const li = document.createElement("li");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = doneTodo.length + 1;
    doneBtn.innerText = "DONE";
    span.innerText = text;
    li.appendChild(doneBtn);
    doneBtn.classList.add("done_btn");
    doneBtn.addEventListener("click",deleteDone);
    li.appendChild(span);
    li.id = newId;
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId
    };
    doneTodo.push(doneObj);
    saveDone();
}

function deleteDone(event){
    console.log("fuck");
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const cleanDone = doneTodo.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    doneTodo = cleanDone;
    saveDone();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveDone() {
    localStorage.setItem(DONETODO, JSON.stringify(doneTodo));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    doneBtn.innerText = "DONE";
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    doneBtn.addEventListener("click", plusDone);
    span.innerText = text;
    li.appendChild(doneBtn);
    doneBtn.classList.add("done_btn");
    li.appendChild(delBtn);
    delBtn.classList.add("del_btn");
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}



function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadDoneTodo = localStorage.getItem(DONETODO);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
     if(loadDoneTodo !== null){
        const parsedDone = JSON.parse(loadDoneTodo);
        parsedDone.forEach(function(toDo){
            paintDone(toDo.text);
        })
    }

}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();