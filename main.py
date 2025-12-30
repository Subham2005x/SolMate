import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS: Essential to allow your browser frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI model
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("Missing GEMINI_API_KEY in .env file")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash") # Fastest and most reliable for web apps

class UserMessage(BaseModel):
    text: str

@app.post("/chat")
async def chat_endpoint(message: UserMessage):
    try:
        # Generate response using the AI model
        response = model.generate_content(f"You are a helpful travel assistant. Answer: {message.text}")
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) # Handle server errors gracefully

@app.get("/")
def home():
    return {"status": "Solmate AI Backend is Online"}

if __name__ == "__main__":
    import uvicorn
    # Start the server on localhost:8000
    uvicorn.run(app, host="127.0.0.1", port=8000)

