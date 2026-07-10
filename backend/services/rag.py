from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from config import EMBEDDING_MODEL, VECTOR_DB

print("Step 1: Imports OK")

embeddings = HuggingFaceEmbeddings(
    model_name=EMBEDDING_MODEL
)

print("Step 2: Embeddings created")

db = FAISS.load_local(
    VECTOR_DB,
    embeddings,
    allow_dangerous_deserialization=True
)

print("Step 3: FAISS loaded")