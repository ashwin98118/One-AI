const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    const welcome = document.querySelector(".welcome");

    if (welcome) {
        welcome.remove();
    }

    // Show user's message
    const userMessage = document.createElement("div");
    userMessage.style.marginBottom = "15px";
    userMessage.style.padding = "14px";
    userMessage.style.background = "#f5f5f5";
    userMessage.style.borderRadius = "12px";
    userMessage.textContent = text;

    messages.appendChild(userMessage);

    input.value = "";

    // Show loading message
    const loading = document.createElement("div");
    loading.style.marginBottom = "20px";
    loading.style.padding = "14px";
    loading.textContent = "One AI is thinking...";

    messages.appendChild(loading);

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        loading.remove();

        const aiMessage = document.createElement("div");
        aiMessage.style.marginBottom = "20px";
        aiMessage.style.padding = "14px";
        aiMessage.style.borderRadius = "12px";
        aiMessage.style.background = "#eeeeee";

        if (data.reply) {
            aiMessage.textContent = data.reply;
        } else {
            aiMessage.textContent = "Error: " + data.error;
        }

        messages.appendChild(aiMessage);

    } catch (error) {
        loading.remove();

        const errorMessage = document.createElement("div");
        errorMessage.textContent =
            "Something went wrong. Please try again.";

        messages.appendChild(errorMessage);
    }
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
