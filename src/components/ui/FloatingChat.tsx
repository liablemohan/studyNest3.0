'use client';

import React, { useState } from 'react';

export default function FloatingChat() {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        // TODO: Implement chat functionality
        console.log('Chat with Pierre clicked');
    };

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-navy-700 to-navy-800 text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-gold-500/30 transition-all duration-300 hover:scale-105 group"
            aria-label="Chat with Pierre"
        >
            {/* Chatbot Icon */}
            <div className="relative w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-navy-900"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                </svg>
                {/* Pulse indicator */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            </div>

            {/* Text */}
            <span className="font-semibold text-sm whitespace-nowrap">
                Chat with Pierre
            </span>

            {/* Decorative sparkle */}
            {isHovered && (
                <div className="absolute -top-1 -right-1 w-4 h-4 text-gold-400 animate-ping">
                    ✨
                </div>
            )}
        </button>
    );
}
