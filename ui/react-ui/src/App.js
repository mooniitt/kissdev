import { io } from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";
import Tips from "./components/tips";

function App() {
  useEffect(() => {
    // axios
    //   .get("http://localhost:8889/expired")
    //   .then(({ data }) => console.log(data));
    // const socket = io("ws://localhost:8889");
    // console.log(socket);
    // socket.on("connect", () => "socket.io connection open");
    // socket.send("hello server!");
    const socket = io.connect("ws://localhost:8888");
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("broadcast", (...rest) => {
      console.log(...rest);
    });
    // const socket = new WebSocket("ws://localhost:8889");
    // socket.onopen = () => {
    //   socket.send("Hello!");
    // };
  }, []);
  return (
    <div>
      <Tips />
    </div>
  );
}

export default App;
