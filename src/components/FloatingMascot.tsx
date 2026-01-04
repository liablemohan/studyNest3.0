'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    isBot: boolean;
}

export default function FloatingMascot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Defer initial render
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Bonjour! 👋 I'm Pierre, your StudyNest assistant! How can I help you with your Parisian adventure today?",
            isBot: true,
        },
    ]);
    const [inputValue, setInputValue] = useState('');

    // Defer FloatingMascot rendering to improve initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // Load after 2 seconds when page is already interactive
        return () => clearTimeout(timer);
    }, []);

    const quickResponses = [
        "Help me find housing",
        "Open a bank account",
        "Get a French SIM",
        "CAF subsidy help",
    ];

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const now = Date.now();
        const userMessage: Message = {
            id: now.toString(),
            text,
            isBot: false,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            const botResponses: Record<string, string> = {
                "Help me find housing": "Great choice! 🏠 We have partnerships with trusted agencies and can help you find student-friendly accommodations. Check out our Housing service or book a consultation!",
                "Open a bank account": "Opening a French bank account is essential! 🏦 We guide you through the process with our partner banks and can even help with same-day activation. Visit our Banking section!",
                "Get a French SIM": "Stay connected! 📱 We partner with major French carriers for student-friendly plans. You can get your SIM as part of our package or as a standalone service.",
                "CAF subsidy help": "CAF can cover up to €200/month of your rent! 💰 Our team helps you with the entire application process. Check out our Subsidy service!",
            };

            const botMessage: Message = {
                id: (now + 1).toString(),
                text: botResponses[text] || "I'd be happy to help! For detailed assistance, please check out our Services page or book a consultation with our team.",
                isBot: true,
            };

            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    // Don't render until visible
    if (!isVisible) return null;

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-20 h-20 rounded-full
                   bg-gradient-to-br from-white/40 to-white/10
                   backdrop-blur-xl border-2 border-gold-400
                   shadow-2xl shadow-gold-500/20
                   overflow-hidden
                   hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
                <Image
                    src="/images/pierre-mascot.png"
                    alt="Chat with Pierre"
                    fill
                    className="object-cover"
                    loading="lazy"
                />
                {/* Pulse animation */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold-400"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.button>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]
                       bg-white rounded-3xl shadow-2xl overflow-hidden
                       border border-beige-200"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-navy-600 to-navy-700 p-4 flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400">
                                <Image
                                    src="/images/pierre-mascot.png"
                                    alt="Pierre"
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    Pierre <Sparkles size={16} className="text-gold-400" />
                                </h3>
                                <p className="text-sm text-beige-300">Your StudyNest Assistant</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
                         text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-beige-50">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.isBot
                                            ? 'bg-white shadow-sm border border-beige-200 rounded-tl-sm'
                                            : 'bg-gradient-to-r from-navy-600 to-navy-700 text-white rounded-tr-sm'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Responses */}
                        <div className="p-3 border-t border-beige-200 bg-white">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {quickResponses.map((response) => (
                                    <button
                                        key={response}
                                        onClick={() => handleSend(response)}
                                        className="px-3 py-1.5 text-xs font-medium rounded-full
                             bg-beige-100 text-navy-700
                             hover:bg-gold-100 hover:text-gold-700
                             transition-colors"
                                    >
                                        {response}
                                    </button>
                                ))}
                            </div>

                            {/* Input */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(inputValue);
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-beige-50 border border-beige-200
                           text-navy-700 placeholder:text-navy-400
                           focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                                />
                                <button
                                    type="submit"
                                    className="p-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500
                           text-navy-900 hover:from-gold-300 hover:to-gold-400 transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
