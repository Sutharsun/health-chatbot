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
function addUserMessage(text) {

    chatBox.innerHTML += `

    <div class="user-message">

        <div class="message">

            ${text}

            <br><br>

            <small>${currentTime()}</small>

        </div>

    </div>

    `;

    scrollBottom();

}