const socket = io();
let input = document.querySelector("#input")
let messageAarea = document.querySelector(".message-area")
let btn = document.querySelector(".btn")

let name;
while (!name) {
    name = prompt("Please Enter your name.");
    // name = "crab";
}

input.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        if (e.target.value.trim().length === 0) {
            return 0;
        }
        else {
            sendMessage(e.target.value)
            e.target.value = "";
        }
    }
})
btn.addEventListener("click", () => {
    if (input.value.trim().length === 0) {
        return 0;
    }
    else {
        sendMessage(input.value)
        input.value = "";
    }
})

let sendMessage = (message) => {
    let data = {
        user: name,
        message: message.trim()
    }

    // append
    appendMessage(data, "outgoing")
    scrollToBottom();

    //send to server
    socket.emit("message", data);
}

let appendMessage = (data, type) => {
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message")

    let markup = `
    <h4>${data.user}</h4>
    <p>${data.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageAarea.appendChild(mainDiv);
}

// receive message from server
socket.on("message", (data) => {
    // console.log(data)
    appendMessage(data, "incoming")
    scrollToBottom();
})

let scrollToBottom = () => {
    messageAarea.scrollTop = messageAarea.scrollHeight;
}