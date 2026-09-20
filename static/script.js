const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    const welcome = document.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }

    const message = document.createElement("div");

    message.style.marginBottom = "20px";
    message.style.padding = "14px";
    message.style.background = "#f5f5f5";
    message.style.borderRadius = "12px";

    message.textContent = text;

    messages.appendChild(message);

    input.value = "";
}

function newChat() {
    messages.innerHTML = `
        <div class="welcome">
            <div class="welcome-icon">✦</div>
            <h2>Welcome to One AI</h2>
            <p>Ask me anything.</p>
        </div>
    `;

    input.value = "";
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
