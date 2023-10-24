const socket = io();

const welcome = document.getElementById("welcome");

const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
    event.preventDefault()
    const input = form.querySelector("input");
    socket.emit("enter_room", {payload: input.value}, () => {
        console.log("server is done!")
        // 세번째 인자는 서버에서 실행되는 함수.
        // 서버에서 실행되는 함수는 서버에서 실행되고 나서 클라이언트에서 실행됨.
    });
    // 1. custom event를 만들 수 있음.
    // 2. 여기에 스트링이 아닌 오브젝트를 보낼 수 있음!
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

