"use client";

import { useState, useEffect } from "react";

function getEndOfDay(): Date {
  const now = new Date();
  const target = new Date(now);

  // Set to end of today (23:59:59.999)
  target.setUTCHours(23, 59, 59, 999);

  // If we've already passed the end of today, use end of tomorrow
  if (now.getTime() >= target.getTime()) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  return target;
}

function getTimeRemaining(target: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const diff = Math.max(0, target.getTime() - now.getTime());

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function Countdown() {
  const [target] = useState(() => getEndOfDay());
  const [time, setTime] = useState(() => getTimeRemaining(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(getTimeRemaining(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  if (!mounted) {
    return (
      <div className="text-center">
        <div className="text-5xl sm:text-7xl font-mono font-bold tracking-tight">
          --d --h --m --s
        </div>
        <p className="mt-4 text-zinc-500 text-lg">until next merge</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-5xl sm:text-7xl font-mono font-bold tracking-tight">
        {time.days}d {pad(time.hours)}h {pad(time.minutes)}m {pad(time.seconds)}s
      </div>
      <p className="mt-4 text-zinc-400 text-lg">until next merge</p>
    </div>
  );
}
