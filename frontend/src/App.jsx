import { useState } from "react"
import axios from "axios"

export default function App() {
  const [text, setText] = useState("");
  const [translit, setTranslit] = useState("");

  const handleClear = () => {
    setText("")
    setTranslit("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:8000/api", { data: text });
      setTranslit(response.data.data);
    } catch (error) {
      console.error("Transliteration error:", error);
    }
  }

  return (
    <form
      className="container text-center"
      onSubmit={handleSubmit}
    >
      <h1 className="my-5 fs-2 text-secondary">Сервис транслитерации</h1>
      <div className="row justify-content-center gap-5">
        <div className="col-5">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fs-4">Ввод</span>
            {text && (
              <button
                type="button"
                title="Очистить"
                onClick={handleClear}
                className="btn btn-close"
              ></button>
            )}
          </div>
          <div className="input-group">
            <textarea
              id="text"
              value={text}
              placeholder="Введите текст"
              onChange={(e) => setText(e.target.value)}
              style={{ minHeight: 250 }}
              className="form-control p-3"
            />
          </div>
        </div>
        <div className="col-5">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fs-4">Результат</span>
          </div>
          <div className="input-group">
            <textarea
              id="translit"
              value={translit}
              readOnly={true}
              style={{ minHeight: 250 }}
              className="form-control p-3"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!text}
        className="btn btn-success mt-4 px-5 py-2 fs-5"
      >
        Выполнить
      </button>
    </form>
  );
};
