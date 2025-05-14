import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    camera={{
      fov: 35,
      near: 0.2,
      far: 500,
    }}
    shadows
  >
    <Scene />
  </Canvas>
);
