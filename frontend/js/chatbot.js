const API_URL = "https://health-chatbot-aepv.onrender.com/chat";

const chatBox = document.getElementById("chatBox");
const questionInput = document.getElementById("question");
const typing = document.getElementById("typing");

// Send using Enter key
questionInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Current Time
function currentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

}

// Auto Scroll
function scrollBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}

// User Message
// Bot Message
function addBotMessage(text) {

    chatBox.innerHTML += `
    <div class="bot-message">

        <div class="avatar bot">
            🤖
        </div>

        <div class="message">
            ${marked.parse(text)}
            <br>
            <small>${currentTime()}</small>
        </div>

    </div>
    `;

    scrollBottom();
}


// Send Message
async function sendMessage() {

    const question = questionInput.value.trim();

    if (!question) return;

    addUserMessage(question);

    questionInput.value = "";

    typing.style.display = "flex";

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        typing.style.display = "none";

        addBotMessage(data.answer);

    } catch (error) {

        typing.style.display = "none";

        addBotMessage("❌ Unable to connect to the server.");

        console.error(error);

    }

}


// Clear Chat
function clearChat() {

    location.reload();

}


// Logout
function logout() {

    alert("Logout clicked.");

}