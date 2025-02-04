import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import Button from "./ui/Button";

const ChatInterface = () => {
  const { country } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi there! I'm your travel assistant 🌍. Want to know more about a ${
        country !== undefined ? country : "country"
      }? Ask me about famous landmarks, languages, culture, or any travel tips! 
         What would you like to explore today?`,
      sender: "ai",
    },
  ]);

  const suggestions = [
    `Best places to visit in ${country ? country : "country"}?`,
    `What’s special about ${country ? country : "country"}?`,
    `Translate the following information about ${
      country ? country : "country"
    } into Indonesian`,
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        status: "sent",
      };
      setMessages((messages) => [...messages, newMsg]);
      setNewMessage("");
      setIsTyping(true);

      try {
        let previousMessages = messages.map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.text,
        }));
        const response = await axios.post(
          "/api/v1/chat/completions",
          {
            model: "meta/llama-3.1-405b-instruct",
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant. The user is asking about ${country}. Please provide a clear, concise, and friendly response. 
                If it's about a country, include relevant details like famous places, language, culture, and travel recommendations.
                If the user later asks for a translation of the ${country} details, provide the translation of the last response provided, based on the user's language request.
                If you're unsure about the information, politely ask the user for clarification to ensure an accurate response before providing an answer.
                Do not make assumptions—ask clarifying questions when necessary. `,
              },
              ...previousMessages,
              {
                role: "user",
                content: `${newMessage}`,
              },
            ],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 1024,
            stream: false,
          },
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`,
            },
          }
        );

        const aiResponse = {
          id: messages.length + 2,
          text: response.data.choices[0].message.content,
          sender: "ai",
          timestamp: new Date(),
          status: "read",
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setIsTyping(false);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isTyping) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`h-screen flex flex-col "bg-gray-50"
      }`}
    >
      <div className="flex-1 flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4 max-w-[48rem]">
            <Button arrow="left" text="Back" onClick={() => navigate(-1)} />
            <h1 className="text-2xl font-bold text-center">Travel Assistant</h1>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 pb-[15rem] md:pb-[12rem]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex lg:max-w-[48rem] mx-auto ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 flex items-center">
                    <img
                      src="/earth.svg"
                      alt="AI Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`px-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-2xl max-w-[70%] shadow-sm py-4"
                      : "w-full"
                  }`}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className={message.sender === "user" ? "" : "markdown"}
                  >
                    {message.text}
                  </Markdown>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-3 max-w-[48rem] mx-auto ps-10">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="fixed z-50 bottom-3 left-0 right-0 mt-auto max-w-[48rem] mx-auto p-4 rounded-xl">
            <div className="flex items-center space-x-2 mb-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(suggestion)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl md:rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent focus:outline-none"
              />
              <button
                disabled={isTyping}
                onClick={handleSend}
                className={`p-2 ${
                  isTyping
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } rounded-full transition-colors`}
              >
                <FiSend className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
