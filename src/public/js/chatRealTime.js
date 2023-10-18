const socket = io();

let name = "";

async function setName() {
  name = prompt("Enter your name:");
  if (name) {
    document.getElementById("span-nombre").textContent = name;
  }
}

setName();

const chatBox = document.getElementById("input-msg");

const sendMessage = () => {
  const message = chatBox.value.trim();
  if (message !== "") {
    socket.emit("msg_front_to_back", {
      user: name,
      msg: message,
    });
    chatBox.value = "";
  }
};

const displayMessages = (msgs) => {
  const msgContainer = document.getElementById("div-msg");
  let content = "";
  msgs.forEach((msg) => {
    content += `<p>${msg.user}: ${msg.msg}</p>`;
  });
  msgContainer.innerHTML = content;
  msgContainer.scrollTop = msgContainer.scrollHeight;
};

socket.on("msg_back_to_front", (msgs) => {
  displayMessages(msgs);
});

socket.emit("request_initial_messages");

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

const sendButton = document.querySelector(".btn-send");

sendButton.addEventListener("click", () => {
  sendMessage();
});
