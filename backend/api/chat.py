from fastapi import APIRouter

from models.request import ChatRequest
from services.chatbot import ask_question

router = APIRouter()

@router.post("/chat")
def chat(request: ChatRequest):

    answer = ask_question(request.question)

    return {
        "answer": answer
    }