import { useState } from "react";
import { IoMdMic } from "react-icons/io";
const Speechtotext = ({ setformdata }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported in this browser. Please use Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setformdata((prev) => ({
        ...prev,
        message: prev.message + " " + transcript,
      }));
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error("Speech Error:", event);

    recognition.start();
  };

  return (
    <button onClick={startListening} className="bg-gray-200 p-2 rounded-md">
      <IoMdMic size={'10px'}/> {isListening ? "..." : ""}
    </button>
  );
};

export default Speechtotext;
