import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Timer as TimerIcon } from "lucide-react";

export function Timer({ cardId }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  useEffect(() => {
    stop();
    setSeconds(0);
    setRunning(false);
  }, [cardId, stop]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      stop();
    }
    return stop;
  }, [running, stop]);

  function reset() {
    setSeconds(0);
    setRunning(true);
  }

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const isWarning = seconds >= 120;

  return (
    <div className="flex items-center gap-1">
      <TimerIcon size={12} className={isWarning ? "text-red-400" : "text-gray-400 dark:text-zinc-500"} />
      <span
        className={`text-xs font-mono font-semibold tabular-nums min-w-[3rem] ${
          isWarning
            ? "text-red-500 dark:text-red-400"
            : "text-gray-500 dark:text-zinc-400"
        }`}
      >
        {mins}:{secs}
      </span>
      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
        title={running ? "Pause" : "Resume"}
      >
        {running ? (
          <Pause size={11} className="text-gray-400 dark:text-zinc-500" />
        ) : (
          <Play size={11} className="text-brand-500 dark:text-brand-400" />
        )}
      </button>
      <button
        type="button"
        onClick={reset}
        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
        title="Reset timer"
      >
        <RotateCcw size={11} className="text-gray-400 dark:text-zinc-500" />
      </button>
    </div>
  );
}
