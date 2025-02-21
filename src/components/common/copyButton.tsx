// CopyButton.tsx
import React, { useState } from 'react';

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopied(true); // Show the success message
                setTimeout(() => {
                    setCopied(false); // Hide the success message after 2 seconds
                }, 2000);
            },
            (err) => {
                console.error('Error copying text: ', err);
            }
        );
    };

    return (
        <div className="relative">
            <button
                onClick={() => copyToClipboard(text)}
                className="cursor-pointer text-black bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-semibold py-1 px-2 rounded-lg shadow-sm transition-all duration-200 ease-in-out"
            >
                📋
            </button>

            {copied && (
                <div className="absolute top-[-30px] left-0 bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-md">
                    Copied!
                </div>
            )}
        </div>
    );
};

export default CopyButton;
