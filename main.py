from fastapi import FastAPI
from pydantic import BaseModel
from llm import ask_travel_bot

app = FastAPI(
    title="India Travel Chatbot API",
    version="1.0"
)


class ChatRequest(BaseModel):
    question: str


@app.get("/")
def root():
    return {"status": "API is running"}

@app.post("/chat")
def chat(request: ChatRequest):
    answer = ask_travel_bot(request.question)
    return {"answer": answer}

