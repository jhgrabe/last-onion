import os
from google import genai

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))


def get_recipe_suggestion(pantry_items):
    if not pantry_items:
        return "Your pantry is empty — add some ingredients first to get suggestions."

    ingredient_list = ", ".join(item["name"] for item in pantry_items)
    prompt = (
        f"I have these ingredients: {ingredient_list}. "
        "Suggest one simple recipe I could make, in 3-4 sentences. "
        "Mention which ingredients I'd still need to buy, if any."
    )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text