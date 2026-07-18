import React, { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  X as CloseIcon,
} from "lucide-react";

const TextToSpeechPlayer = ({ text, autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showPlayer, setShowPlayer] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [language, setLanguage] = useState("en-IN");
  const lastTextRef = useRef("");

  const getVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) => v.lang === language && v.name.includes("Google")
      ) ||
      voices.find((v) => v.lang === language) ||
      voices.find((v) => v.lang.startsWith(language.split("-")[0])) ||
      voices[0]
    );
  };

  const startSpeech = () => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = language;
    u.rate = speed;
    u.volume = isMuted ? 0 : 1;

    u.voice = getVoice();

    u.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    u.onend = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    setUtterance(u);
    window.speechSynthesis.speak(u);

    // progress estimation
    const words = text.split(" ").length;
    const duration = (words / 150) * 60 * 1000;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      setProgress(Math.min((elapsed / duration) * 100, 99));
      if (!window.speechSynthesis.speaking) clearInterval(interval);
    }, 100);
  };

  const restartSpeech = () => {
    stopSpeech();
    setTimeout(startSpeech, 100);
  };

  const togglePlayPause = () => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      startSpeech();
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utterance) utterance.volume = !isMuted ? 0 : 1;
  };

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);

    if (isPlaying) {
      stopSpeech();
      setTimeout(startSpeech, 100);
    }
  };

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {};
  }, []);

  useEffect(() => {
    if (autoPlay && text && text !== lastTextRef.current) {
      lastTextRef.current = text;
      const timer = setTimeout(startSpeech, 1500);
      return () => clearTimeout(timer);
    }
  }, [text, autoPlay]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && !isPaused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
  }, [isPlaying, isPaused]);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  if (!showPlayer) {
    return (
      <button
        onClick={() => setShowPlayer(true)}
        className="fixed bottom-8 left-8 z-50 p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-xl"
      >
        <Volume2 className="text-white" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 bg-gray-900 border border-white/20 rounded-2xl p-6 w-80">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-white font-bold">Audio Reader</h4>
        <button
          onClick={() => {
            stopSpeech();
            setShowPlayer(false);
          }}
        >
          <CloseIcon size={16} className="text-gray-400" />
        </button>
      </div>

      <div className="h-2 bg-white/10 rounded-full mb-3">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
        <span>{Math.round(progress)}%</span>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            if (isPlaying) {
              stopSpeech();
              setTimeout(startSpeech, 100);
            }
          }}
          className="bg-black/30 border border-white/20 rounded px-2 py-1 text-white text-xs"
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

      <div className="flex justify-center gap-3">
        <button onClick={restartSpeech}>
          <SkipBack />
        </button>
        <button
          onClick={togglePlayPause}
          className="bg-green-500 p-3 rounded-full"
        >
          {isPlaying && !isPaused ? <Pause /> : <Play />}
        </button>
        <button onClick={changeSpeed}>{speed}x</button>
        <button onClick={toggleMute}>
          {isMuted ? <VolumeX /> : <Volume2 />}
        </button>
      </div>
    </div>
  );
};

export default TextToSpeechPlayer;
