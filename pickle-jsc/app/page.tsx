"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Home } from "./home/page";
import { ThreeJSScene } from "./telescope/page";
import Image from "next/image";
import { ExplorePage } from "./explore/page";
import { GlobeDemo } from "./globe/page";
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { Quote2 } from "./quote2/page";
import { Quote3 } from "./quote3/page";
import Timeline from "./timeline/page";
import { Quote4 } from "./quote4/page";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatbotModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: "user", content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call Gemini API
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputMessage);
      const response = await result.response;
      const text = response.text();

      // Add assistant message to chat
      const assistantMessage: Message = { role: "assistant", content: text };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 w-72 h-96 bg-white shadow-lg z-50 p-4 text-black rounded-lg">
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2">
        <h2 className="text-lg font-semibold">AI Chatbot</h2>
        <button 
          onClick={onClose}
          className="hover:bg-gray-100 rounded-full p-1"
        >
          ✖
        </button>
      </div>

      {/* Messages Container */}
      <div className="h-64 overflow-y-auto my-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[90%] ${
              message.role === "user"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex space-x-2 p-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form 
        onSubmit={handleSubmit}
        className="absolute bottom-4 left-4 right-4 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter your message"
          className="flex-grow p-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 rounded-r bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? "..." : "➤"}
        </button>
      </form>
    </div>
  );
};

export default function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const toggleAudio = () => {
    const audio = document.getElementById("background-audio") as HTMLAudioElement;
    if (audio) {
      if (isAudioPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  return (
    <div className="relative min-h-screen">
      <audio id="background-audio" src="/waltz.mp3" loop />
      <Home />
      <ThreeJSScene />
      <Quote2 />
      <ExplorePage />
      <Quote3 />
      <Timeline />
      <Quote4 />
      <GlobeDemo />
      <ChatbotModal isOpen={isChatbotOpen} onClose={toggleChatbot} />
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-transparent border-none rounded-full w-14 h-14 flex justify-center items-center cursor-pointer shadow-lg z-10 p-0"
      >
        <Image src="/jwst.svg" alt="Chatbot Icon" height={32} width={32} />
      </button>
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 left-4 bg-transparent border-none text-[#f5f5f5] rounded-full w-14 h-14 flex justify-center items-center cursor-pointer shadow-lg z-10 p-0"
      >
        {isAudioPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
      </button>
    </div>
  );
}