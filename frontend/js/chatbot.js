const API_URL = "https://health-chatbot-aepv.onrender.com/chat";
const chatBox = document.getElementById("chatBox");
const questionInput = document.getElementById("question");
const typing = document.getElementById("typing");

// Send using Enter key
questionInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {git add ../frontend/js/chatbot.js
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

// Bot Message
function addBotMessage(text) {

    const html = marked.parse(text);

    chatBox.innerHTML += `

    <div class="bot-message">

        <div class="avatar bot">

            🤖

        </div>

        <div class="message">

            ${html}

            <br>

            <button class="copy-btn" onclick="copyText(this)">

                Copy

            </button>

            <small>

                ${currentTime()}

            </small>

        </div>

    </div>

    `;

    scrollBottom();

}

// Copy Response
function copyText(btn){

    const message = btn.parentElement.innerText;

    navigator.clipboard.writeText(message);

    btn.innerHTML="Copied ✓";

    setTimeout(()=>{

        btn.innerHTML="Copy";

    },1500);

}

// Main Function
async function sendMessage(){

    const question = questionInput.value.trim();

    if(question==="") return;

    addUserMessage(question);

    questionInput.value="";

    typing.style.display="flex";

    scrollBottom();

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                question:question

            })

        });

        const data = await response.json();

        typing.style.display="none";

        addBotMessage(data.answer);

    }

    catch(error){

        typing.style.display="none";

        addBotMessage(

`# Connection Error

Unable to connect to the backend.

### Check

- FastAPI is running
- Ollama is running
- API URL is correct

`

);

        console.log(error);

    }

}

// New Chat
function clearChat(){

    chatBox.innerHTML=`

<div class="bot-message">

<div class="avatar bot">

🤖

</div>

<div class="message">

<h3>New Chat Started</h3>

<p>

Hello 👋

How can I help you today?

</p>

</div>

</div>

`;

}

// Logout
function logout(){

    if(confirm("Logout?")){

        window.location.href="login.html";

    }

}