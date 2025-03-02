import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import AboutAequitasScreen from "./screens/AboutAequitasScreen";
import AequitasDocumentationScreen from "./screens/AequitasDocumentationScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import ConfigScreen from "./screens/ConfigScreen";
import EmailScreen from "./screens/EmailScreen";

function App () {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen></HomeScreen>}></Route>
          <Route
            path="/aboutaequitas"
            element={<AboutAequitasScreen></AboutAequitasScreen>}
          ></Route>
          <Route
            path="/aequitasdocs"
            element={
              <AequitasDocumentationScreen></AequitasDocumentationScreen>
            }
          ></Route>
          <Route
            path="/aboutus"
            element={<AboutUsScreen></AboutUsScreen>}
          ></Route>
          <Route
            path="/config/:jobId"
            element={<ConfigScreen></ConfigScreen>}
          ></Route>
          <Route
            path="/email/:jobId"
            element={<EmailScreen></EmailScreen>}
          ></Route>
          <Route
            path="/result/:jobId"
            element={<ResultScreen></ResultScreen>}
          ></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
