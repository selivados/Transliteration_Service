import json

with open("../translit_table.json", encoding="utf-8") as file:
    table = json.load(file)

def transliterate(text: str) -> str:
    return "".join(table.get(char, char) for char in text)
