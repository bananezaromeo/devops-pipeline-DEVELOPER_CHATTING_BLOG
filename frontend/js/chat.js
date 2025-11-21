const socket = io("http://localhost:5000");
let selectedUser = null;

// Load users
(async function loadUsers() {
    const users = await request("/users");

    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(u => {
        const div = document.createElement("div");
        div.className = "user";
        div.innerText = u.username;
        div.onclick = () => selectUser(u);
        list.appendChild(div);
    });
})();

// Select user
async function selectUser(user) {
    selectedUser = user;

    const msgs = await request(`/messages/${user._id}`);
    const box = document.getElementById("messages");

    box.innerHTML = "";
    msgs.forEach(m => {
        const decrypted = CryptoJS.AES.decrypt(m.content, "secret123").toString(CryptoJS.enc.Utf8);
        const div = document.createElement("div");
        div.innerText = decrypted;
        box.appendChild(div);
    });
}

// Send message
async function sendMessage() {
    const text = document.getElementById("messageInput").value;
    if (!text || !selectedUser) return;

    const encrypted = CryptoJS.AES.encrypt(text, "secret123").toString();

    await request("/messages", "POST", {
        receiverId: selectedUser._id,
        content: encrypted
    });

    document.getElementById("messageInput").value = "";
}
