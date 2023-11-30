import { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
let socket;

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  function sendMessage() {
    socket.emit("send-chat-message", input);
    setChat((prevChat) => [...prevChat, { msg: input, dir: " ml-auto" }]);
  }

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("chat-message", (data) => {
      console.log(data);
      setChat((prevChat) => [...prevChat, { msg: data, dir: " mr-auto" }]);
    });
  }, []);

  return (
    <div className="bg-blue-100 flex flex-col items-center gap-4 pt-4 pb-16">
      <div className="text-2xl">Surf Chat</div>
      <div className="w-[400px] h-[350px] border-2 border-black bg-gray-50 rounded-md overflow-y-auto flex flex-col gap-2">
        {chat.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "bg-green-600 text-white text-lg mx-2 p-1 rounded-md w-2/3" +
                msg.dir
              }
            >
              {msg.msg}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter message"
          className="text-xl rounded-md w-[300px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-2 text-xl py-1"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
