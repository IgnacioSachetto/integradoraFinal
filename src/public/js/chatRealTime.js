const socket = io();

let name = "";

async function asyncWrapper() {
  const { value: enteredName } = await Swal.fire({
    title: "Enter your name",
    input: "text",
    inputLabel: "Your name",
    inputValue: "",
    showCancelButton: true,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "Please complete the field";
      }
    },
  });
  name = enteredName;
  document.getElementById("span-name").innerHTML = name;
}

asyncWrapper();

const chatBox = document.getElementById("input-msg");

chatBox.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    const message = chatBox.value.trim();
    if (message !== "") {
      socket.emit("msg_front_to_back", {
        user: name,
        msg: message,
      });
      chatBox.value = "";
    }
  }
});

const sendButton = document.querySelector(".btn-send");

sendButton.addEventListener("click", () => {
  const message = chatBox.value.trim();
  if (message !== "") {
    socket.emit("msg_front_to_back", {
      user: name,
      msg: message,
    });
    chatBox.value = "";
  }
});

socket.on("msg_back_to_front", (msgs) => {
  const msgContainer = document.getElementById("div-msg");
  let content = "";
  msgs.forEach((msg) => {
    content += `<p>${msg.user}: ${msg.msg}</p>`;
  });
  msgContainer.innerHTML = content;
  msgContainer.scrollTop = msgContainer.scrollHeight;
});
