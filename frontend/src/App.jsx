import { useState } from "react"

import table from "../../translit_table.json"

export default function App() {
  const [text, setText] = useState("");

  const transliterate = (text) => {
    return text.split("").map(char => table[char] || char).join("");
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-5">
          <h2 className="text-center mb-5">Сервис транслитерации</h2>
          <div className="form-floating mb-3">
            <input
              id="text"
              type="text"
              placeholder="Текст"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-control"
            />
            <label htmlFor="text" className="text-secondary">
              Текст
            </label>
          </div>
          <div className="form-floating">
            <input
              id="transliteration"
              type="text"
              placeholder="Транслитерация"
              value={transliterate(text)}
              readOnly={true}
              className="form-control"
            />
            <label htmlFor="transliteration" className="text-secondary">
              Транслитерация
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
