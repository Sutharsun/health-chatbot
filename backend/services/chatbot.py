from langchain_ollama import ChatOllama

from services.rag import db
from services.prompt import SYSTEM_PROMPT
from config import OLLAMA_MODEL

llm = ChatOllama(model=OLLAMA_MODEL)

def ask_question(question: str):
    docs = db.similarity_search(question, k=4)

    context = "\n\n".join(doc.page_content for doc in docs)

    prompt = f"""
{SYSTEM_PROMPT}

Context:
{context}

Question:
{question}

Professional Answer:
"""

    response = llm.invoke(prompt)

    return response.content