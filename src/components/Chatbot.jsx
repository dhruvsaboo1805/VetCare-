import React, { useState } from "react";
import chatBot from "../assets/chat-bot.webp"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      { sender: "bot", text: "Thank you for your message!" },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        {/* 💬 */}
        <img src={chatBot} alt="" className="w-10 h-10"/>
      </button>

      {/* Chatbot UI */}
      {isOpen && (
        <div className="mt-4 w-80 bg-white rounded-lg shadow-lg transition-all animate-slide-up">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">AI Bot</h3>
            <button
              onClick={toggleChatbot}
              className="text-white font-bold hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Chat Window */}
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex items-center p-3 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
