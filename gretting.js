const form = document.querySelector(".js-form"),
        input = form.querySelector(".input"),
        greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser", // 로컬스토리지에 넣을 유저 정보
        SHOWING_CN = "showing";

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS); // 로컬스토리지에 유저 정보를 넣는다
    if(currentUser === null){

    }
    else{
        paintGreeting(currentUser);
    }
}
function init(){
    loadName();
}
init()