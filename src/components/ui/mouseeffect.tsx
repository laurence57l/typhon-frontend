import { useState, useEffect } from "react";

const BlinkingInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Cursor blinks every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here..."
      />
      {showCursor && <span className="blinking-cursor">|</span>}
      <style jsx>{`
        .input-container {
          position: relative;
          display: inline-block;
        }
        input {
          font-size: 16px;
          padding: 8px;
          border: 1px solid #ccc;
          outline: none;
        }
        .blinking-cursor {
          position: absolute;
          right: 10px;
          bottom: 12px;
          color: black;
          font-weight: bold;
          font-size: 16px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BlinkingInput;