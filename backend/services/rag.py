from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from config import EMBEDDING_MODEL, VECTOR_DB

embeddings = None
db = None

def get_db():
    global embeddings, db

    if db is None:
        print("Loading embeddings...")
        embeddings = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL
        )

        print("Loading FAISS...")
        db = FAISS.load_local(
            VECTOR_DB,
            embeddings,
            allow_dangerous_deserialization=True
        )

        print("FAISS loaded.")

    return db