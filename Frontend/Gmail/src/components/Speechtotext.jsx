import { useState } from "react";

const VoiceToText = ({ onTextChange }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition; // ✅ Fix: Use webkitSpeechRecognition for Safari & Brave

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      if (onTextChange) onTextChange(transcript); // ✅ Fix: Ensure onTextChange is called only if defined
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) =>
      console.error("Speech Recognition Error:", event);

    recognition.start();
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-80">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Speak or type your message..."
        rows="4"
      ></textarea>
      <button
        onClick={startListening}
        className={`mt-2 px-4 py-2 rounded ${
          isListening ? "bg-gray-500" : "bg-blue-500"
        } text-white`}
        disabled={isListening} // ✅ Fix: Prevent multiple clicks while listening
      >
        🎙 {isListening ? "Listening..." : "Start Voice Input"}
      </button>
    </div>
  );
};

export default VoiceToText;