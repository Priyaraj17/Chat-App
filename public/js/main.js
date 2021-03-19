const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get Username and room from URL:
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom:
socket.emit("joinRoom", { username, room });

// Get room and users:
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", (msg) => {
  console.log(msg);
  outputMessage(msg);

  // Scroll down:
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit:
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server:
  socket.emit("chatMessage", msg);

  // Clear input:
  e.target.elements.msg.value = "";
  e.target.elements.msg.value.focus();
});

// Output message to DOM:
function outputMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM:
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM:
function outputUsers(users) {
  userList.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`;
}
