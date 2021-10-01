import * as React from "react";
import { render } from "react-dom";
import Heading from "./Heading";
import Webcam from "./Webcam";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello Patrick</h1>
      <Heading>React + TypeScript + Styled-Components</Heading>
      <Webcam />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
