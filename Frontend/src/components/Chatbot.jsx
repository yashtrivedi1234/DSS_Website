import React, { useState, useEffect, useRef } from "react";
import { useChatWithGroqMutation } from "../api/groqApi";
import { Send, MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [chatWithGroq, { isLoading }] = useChatWithGroqMutation();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! 👋 Welcome to 3S Digital Signage Solutions. How can I help you today?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const userMsg = { role: "user", content: trimmedInput };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");

    try {
      // Call API
      const response = await chatWithGroq(trimmedInput).unwrap();

      console.log("✅ API Response:", response);

      // Extract reply from response
      const assistantMessage = response?.reply || response?.data?.reply || "";

      if (!assistantMessage) {
        throw new Error("Empty response from server");
      }

      // Add assistant message
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (err) {
      console.error("❌ Chat error:", err);

      // Extract error message
      let errorMessage = "Sorry, I encountered an error. Please try again.";

      if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }

      // Add error message
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: `⚠️ ${errorMessage}`,
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button - z-index below splash cursor (50) and custom cursor (9999) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-24 md:right-6 z-[45] p-3 sm:p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group animate-bounce-subtle"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window - z-index below splash cursor (50) and custom cursor (9999) */}
      {isOpen && (
        <>
          {/* Mobile: Full Screen Overlay */}
          <div className="fixed inset-0 z-[45] bg-white md:hidden flex flex-col animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">
                    3S Digital Assistant
                  </h3>
                  <p className="text-xs text-white/80">
                    Online • Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container - Mobile */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white text-gray-800 shadow-md px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Mobile */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200 safe-area-bottom">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  className="flex-1 border-2 border-gray-200 rounded-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm focus:outline-none focus:border-green-500 transition-all duration-300 bg-gray-50 text-gray-900"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  maxLength={2000}
                />
                <button
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group flex-shrink-0"
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by 3S Digital Signage Solutions
              </p>
            </div>
          </div>

          {/* Tablet & Desktop: Floating Window */}
          <div className="hidden md:flex fixed bottom-6 right-6 lg:bottom-24 lg:right-6 w-80 sm:w-96 h-[500px] max-h-[calc(100vh-7rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[45] flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    3S Digital Assistant
                  </h3>
                  <p className="text-xs text-white/80">
                    Online • Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-300"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Container - Desktop */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white text-gray-800 shadow-md px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Desktop */}
            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  className="flex-1 border-2 border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-all duration-300 bg-gray-50 text-gray-900"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  maxLength={2000}
                />
                <button
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by 3S Digital Signage Solutions
              </p>
            </div>
          </div>
        </>
      )}

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        /* Safe area for devices with notches */
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        /* Smooth scrolling */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  );
}
