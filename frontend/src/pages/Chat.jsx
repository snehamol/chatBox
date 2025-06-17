import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const { logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  const promptTemplates = [
    "Hi there!",
    "Tell me a joke",
    "What can you do?",
    "How's the weather?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botResponse = {
        text: `You said: "${userMessage.text}"`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const exportChat = () => {
    const chatText = messages
      .map((msg) => `${msg.sender === "user" ? "You" : "Bot"}: ${msg.text}`)
      .join("\n");

    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-history.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="p-4 bg-white dark:bg-gray-800 shadow relative flex items-center justify-between">
        <div className="absolute left-1/2 transform -translate-x-1/2 sm:static sm:translate-x-0 sm:left-auto sm:flex-1 text-center">
          <h1 className="text-xl font-extrabold text-gray-800 dark:text-white">
            <span className="sm:hidden">ChatBot</span>
            <span className="hidden sm:inline">ChatBot</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={exportChat}
            className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm sm:text-base"
            >
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
            >
            <span className="sm:hidden">Logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-xs ${
              msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="mr-auto text-gray-500 italic dark:text-gray-400">
            Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-800">
        {promptTemplates.map((text, idx) => (
          <button
            key={idx}
            onClick={() => setInput(text)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {text}
          </button>
        ))}
      </div>

      <footer className="p-4 bg-white dark:bg-gray-800 shadow flex items-center space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-black dark:text-white"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
