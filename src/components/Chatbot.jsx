import React, { useState } from "react";
import chatBot from "../assets/chat-bot.webp";

const chat_Api = import.meta.env.VITE_API_URL_CHAT; // API URL for chat
const continue_chat_Api = import.meta.env.VITE_API_URL_CONTINUE_CHAT; // Optional API for continuing chat

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
  
    // Add the user's message to the chat
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
    ]);
  
    // Get pet_id from local storage
    const petId = localStorage.getItem("pet_id");
  
    // Construct the API URL with the pet_id query parameter
    const apiUrl = new URL(chat_Api);
    if (petId) {
      apiUrl.searchParams.append("pet_id", petId);
    }
  
    // Call the chat API to get a response from the bot
    try {
      const response = await fetch(apiUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to get a response from the bot");
      }
  
      const data = await response.json();
  
      // Check for error details in the response
      if (data.detail && data.detail[0].type === "missing") {
        const missingField = data.detail[0].loc.join(" -> ");
        const errorMessage = `Missing required field: ${missingField}`;
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: errorMessage },
        ]);
        return;
      }
  
      // If there is no error, show the bot's response
      const botMessage = data.result || "Sorry, I didn't understand that.";
      localStorage.setItem("chat_id" , data.chatId);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, there was an error. Please try again." },
      ]);
    }
  
    // Clear the input field
    setInput("");
  };
  
  

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        <img src={chatBot} alt="" className="w-10 h-10" />
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
