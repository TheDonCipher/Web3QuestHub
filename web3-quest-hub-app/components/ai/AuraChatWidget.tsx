'use client';

import React, { useState } from 'react';
import { getAuraResponse } from '@/lib/firebase/functions';

interface Message {
  role: 'user' | 'aura';
  content: string;
  timestamp: Date;
}

export default function AuraChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'aura',
      content: 'Hello, Explorer! I\'m AURA, your Web3 guide. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await getAuraResponse({
        prompt: inputValue,
        context: {
          // TODO: Add actual quest context
        },
      });

      const auraMessage: Message = {
        role: 'aura',
        content: result.data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, auraMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'aura',
        content: 'I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-glow"
        >
          <span className="text-2xl">🤖</span>
        </button>
      ) : (
        <div className="w-96 h-[500px] cyber-border rounded-lg bg-black/95 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-cyan-500">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-bold">AURA</h3>
                <p className="text-xs text-gray-400">Your Web3 Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-400">AURA is typing...</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-cyan-500">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-gray-900 border border-cyan-500 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded font-semibold text-sm disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
