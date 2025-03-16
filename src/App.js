import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es.json";
import localeEnMessages from "./locales/en.json";
import LoginForm from "./Formulario";
import ListadoRobots from "./ListadoRobots";

const userLang = navigator.language.startsWith("es") ? "es" : "en";
const messages = userLang === "es" ? localeEsMessages : localeEnMessages;

function App() {
  return (
    <IntlProvider locale={userLang} messages={messages}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/robots" element={<ListadoRobots />} />
          </Routes>
        </div>
      </Router>
    </IntlProvider>
  );
}

export default App;
