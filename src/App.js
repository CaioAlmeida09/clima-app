import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [clima, setClima] = useState(0);
  const [backgroundClass, setBackgroundClass] = useState("empty-bg");
  const [cidade, setCidade] = useState("");
  const [erro, setErro] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const HandleInput = async (e) => {
    try {
      const api = {
        key: "3ee32176fbc4070662893138e0e9dea6",
        base: "https://api.openweathermap.org/data/2.5/",
      };
      await axios
        .get(
          `${api.base}weather?q=${search}&lang=pt_br&units=metric&APPID=${api.key}`
        )
        .then(function (response) {
          setClima(response.data.main.temp);
          setEstado(response.data.weather[0].description);
          setCidade(search);
          if (response.data.main.temp <= 17 && response.data.main.temp !== 0) {
            setBackgroundClass("sunny-bg");
          } else if (
            response.data.main.temp > 14 &&
            response.data.main.temp !== ""
          ) {
            setBackgroundClass("cold-bg");
          } else if (response.data.main.temp === 0) {
            setBackgroundClass("empty-bg ");
          }
        });
    } catch {
      setErro(<p className="Erro"> Não temos informações sobre essa cidade</p>);
      setEstado("");
      setBackgroundClass("empty-bg");
    }
  };

  return (
    <div className="principal">
      <main className="main">
        <div className={`container ${backgroundClass}`}>
          <section className="Search">
            <input
              type="string"
              placeholder="Digite a cidade para consulta"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="button" onClick={HandleInput}>
              Pesquisar
            </button>
          </section>
          {estado ? (
            <section className="Info">
              <p className="cidade"> {cidade} </p>
              <p className="data"> {currentDate.toLocaleString()} </p>
              <div className="clima">{clima}°</div>
              <p className="estado"> {estado} </p>
            </section>
          ) : (
            <div>
              <h2> {erro} </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
