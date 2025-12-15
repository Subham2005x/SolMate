from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate

SYSTEM_PROMPT = """
You are an India-focused travel planning assistant.

Rules:
- Focus only on Indian destinations.
- Recommend well-known hotels, restaurants, and attractions.
- Categorize hotels into Budget, Mid-range, and Luxury.
- Give approximate costs in INR (₹), not exact prices.
- Create clear day-wise itineraries when asked.
- Provide simple budget breakdowns (stay, food, transport, activities).
- Mention safety tips and local travel advice when relevant.
- Do NOT claim real-time availability or prices.
"""

llm = Ollama(
    model="gemma:2b",
    base_url="http://localhost:11434"
)

prompt_template = PromptTemplate(
    input_variables=["system", "question"],
    template="""
{system}

User query:
{question}

Answer:
"""
)

def ask_travel_bot(question: str) -> str:
    final_prompt = prompt_template.format(
        system=SYSTEM_PROMPT,
        question=question
    )
    return llm.invoke(final_prompt)

