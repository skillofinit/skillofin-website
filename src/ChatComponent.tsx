import React, { useState, useEffect } from "react";

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [senderEmail, setSenderEmail] = useState<string>(""); // Sender Email
  const [receiverEmail, setReceiverEmail] = useState<string>(""); // Receiver Email
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (senderEmail && receiverEmail && senderEmail !== receiverEmail) {
      const socketUrl = `ws://localhost:5000?senderEmail=${senderEmail}&receiverEmail=${receiverEmail}`;
      const socket = new WebSocket(socketUrl);

      socket.onmessage = (event: MessageEvent) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };
      setWs(socket)

      return () => {
        socket.close();
      };
    }
  }, [senderEmail, receiverEmail]);

  const sendMessage = () => {
    if (ws && message) {
      const messageToSend = `${senderEmail}:${message}`;
      ws.send(messageToSend);
      setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-5">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Chat Application
        </h2>

        {/* Sender Email Input */}
        <div className="mb-4">
          <input
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Sender Email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
        </div>

        {/* Receiver Email Input */}
        <div className="mb-4">
          <input
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Receiver Email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
          />
        </div>

        {/* Message display */}
        <div className="h-96 overflow-y-auto p-3 bg-gray-50 rounded-md mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-md ${
                msg.startsWith("You")
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Message input and send button */}
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
