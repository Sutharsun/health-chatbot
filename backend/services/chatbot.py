from langchain_groq import ChatGroq

from services.rag import get_db
from services.prompt import SYSTEM_PROMPT

from config import GROQ_API_KEY, GROQ_MODEL


llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model_name=GROQ_MODEL,
    temperature=0.2
)


def ask_question(question: str):

    db = get_db()

    retriever = db.as_retriever(
    search_type="mmr",
    search_kwargs={
        "k": 10,
        "fetch_k": 30
    }
)

    docs = retriever.invoke(question)

    context = "\n\n".join(
        doc.page_content for doc in docs
    )

    prompt = f"""
{SYSTEM_PROMPT}

You are an expert Star Health Insurance Assistant.

Answer ONLY using the context.

If the answer is not present, say:

'I couldn't find this information in the available Star Health documents.'

Context
--------
{context}

Question
--------
{question}

Professional Answer:
"""

    response = llm.invoke(prompt)

    return response.content