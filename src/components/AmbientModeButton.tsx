"use client";

import type { MouseEvent, PointerEvent, TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/i18n/language";

const ambientAudioPath = "/audio/ambient-mode.mp3";
const ambientVolume = 0.23;
const fadeDuration = 900;
const fadeSteps = 18;

function getAudioVolume(audio: HTMLAudioElement) {
  return Number.isFinite(audio.volume) ? audio.volume : 0;
}

function setAudioVolume(audio: HTMLAudioElement, volume: number) {
  try {
    audio.volume = Math.max(0, Math.min(ambientVolume, volume));
  } catch {
    // Some browsers restrict programmatic media volume. In that case the
    // mute control still works and playback remains user-initiated.
  }
}

function prepareAmbientAudio(audio: HTMLAudioElement, muted: boolean) {
  if (!audio.getAttribute("src")) {
    audio.src = ambientAudioPath;
  }

  audio.loop = true;
  audio.preload = "auto";
  audio.muted = muted;
  audio.setAttribute("playsinline", "true");
  audio.setAttribute("webkit-playsinline", "true");
}

export function AmbientModeButton() {
  const { copy } = useLanguage();
  const ambientCopy = copy.ambient;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const lastTouchRef = useRef({ ambient: 0, mute: 0 });
  const [isOn, setIsOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const clearFadeTimer = () => {
    if (fadeTimerRef.current !== null) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("ambient-mode", isOn);

    return () => {
      document.documentElement.classList.remove("ambient-mode");
    };
  }, [isOn]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      prepareAmbientAudio(audio, false);
      audio.load();
    }

    return () => {
      clearFadeTimer();
      audio?.pause();
    };
  }, []);

  const fadeAudioTo = (targetVolume: number, onComplete?: () => void) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    clearFadeTimer();

    const startVolume = getAudioVolume(audio);
    const volumeChange = targetVolume - startVolume;
    let step = 0;

    fadeTimerRef.current = window.setInterval(() => {
      step += 1;
      const progress = Math.min(step / fadeSteps, 1);
      setAudioVolume(audio, startVolume + volumeChange * progress);

      if (progress >= 1) {
        clearFadeTimer();
        onComplete?.();
      }
    }, fadeDuration / fadeSteps);
  };

  const startAmbientAudio = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    clearFadeTimer();
    setAudioError(false);

    prepareAmbientAudio(audio, isMuted);
    setAudioVolume(audio, 0);

    let playbackWatchdog: number | null = null;

    try {
      const playPromise = audio.play();

      playbackWatchdog = window.setTimeout(() => {
        if (audio.paused) {
          console.warn(
            "Ambient Mode audio is still paused after a user tap. Mobile Safari may require another tap or may be blocking local audio playback.",
          );
          setAudioError(true);
        }
      }, 1200);

      await playPromise;

      if (playbackWatchdog !== null) {
        window.clearTimeout(playbackWatchdog);
      }

      if (audio.paused) {
        console.warn(
          "Ambient Mode audio play() resolved, but the audio element is still paused.",
        );
        setAudioError(true);
        setIsOn(false);
        return;
      }

      setAudioError(false);
      setIsOn(true);

      if (!isMuted) {
        fadeAudioTo(ambientVolume);
      }
    } catch (error) {
      if (playbackWatchdog !== null) {
        window.clearTimeout(playbackWatchdog);
      }

      console.warn(
        "Ambient Mode audio could not start. Mobile Safari may require another user tap.",
        error,
      );
      setAudioError(true);
      setIsOn(false);
    }
  };

  const stopAmbientAudio = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    fadeAudioTo(0, () => {
      audio.pause();
    });
  };

  const toggleAmbientMode = () => {
    if (isOn) {
      setIsOn(false);
      stopAmbientAudio();
      return;
    }

    void startAmbientAudio();
  };

  const triggerAmbientFromTouch = (
    event: PointerEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
  ) => {
    if (Date.now() - lastTouchRef.current.ambient < 450) {
      event.preventDefault();
      return;
    }

    lastTouchRef.current.ambient = Date.now();
    event.preventDefault();
    toggleAmbientMode();
  };

  const handleAmbientPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") {
      return;
    }

    triggerAmbientFromTouch(event);
  };

  const handleAmbientTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    triggerAmbientFromTouch(event);
  };

  const handleAmbientClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (Date.now() - lastTouchRef.current.ambient < 700) {
      event.preventDefault();
      return;
    }

    toggleAmbientMode();
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    const nextMuted = !isMuted;

    setIsMuted(nextMuted);

    if (!audio) {
      return;
    }

    prepareAmbientAudio(audio, nextMuted);
    audio.muted = nextMuted;

    if (!isOn) {
      return;
    }

    if (nextMuted) {
      setAudioVolume(audio, 0);
      return;
    }

    void audio
      .play()
      .then(() => {
        fadeAudioTo(ambientVolume);
      })
      .catch((error) => {
        console.warn(
          "Ambient Mode audio could not resume after unmute.",
          error,
        );
        setAudioError(true);
      });
  };

  const triggerMuteFromTouch = (
    event: PointerEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
  ) => {
    if (Date.now() - lastTouchRef.current.mute < 450) {
      event.preventDefault();
      return;
    }

    lastTouchRef.current.mute = Date.now();
    event.preventDefault();
    toggleMute();
  };

  const handleMutePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") {
      return;
    }

    triggerMuteFromTouch(event);
  };

  const handleMuteTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    triggerMuteFromTouch(event);
  };

  const handleMuteClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (Date.now() - lastTouchRef.current.mute < 700) {
      event.preventDefault();
      return;
    }

    toggleMute();
  };

  return (
    <div className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] right-3 z-40 flex items-center gap-1.5 sm:bottom-4 sm:right-4 sm:gap-2">
      <audio
        ref={audioRef}
        src={ambientAudioPath}
        preload="auto"
        loop
        playsInline
      />
      <button
        type="button"
        aria-pressed={isOn}
        onClick={handleAmbientClick}
        onPointerDown={handleAmbientPointerDown}
        onTouchStart={handleAmbientTouchStart}
        title={ambientCopy.title}
        className={`lab-button flex items-center gap-1.5 border px-2 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-white sm:gap-3 sm:px-3 sm:py-2 sm:text-xs sm:tracking-[0.12em] ${
          isOn
            ? "border-[#46f0e5]/70 bg-[#46f0e5]/12 text-white shadow-[0_18px_70px_rgba(70,240,229,0.2),0_0_48px_rgba(255,79,163,0.16)]"
            : "border-white/12 bg-[#07080d]/78 text-[#f5f5f5]/74 hover:border-[#46f0e5]/60"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`absolute inset-0 rounded-full ${
              isOn ? "animate-ping bg-[#ff4fa3]/55" : "bg-[#ff4fa3]/35"
            }`}
          />
          <span className="relative h-2.5 w-2.5 rounded-full bg-[#46f0e5]" />
        </span>
        <span className="hidden sm:inline">{ambientCopy.prefix}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-[#ff4fa3] sm:text-[10px]">
          {isOn ? ambientCopy.on : ambientCopy.off}
        </span>
        {audioError ? (
          <span className="text-[8px] text-[#ff9966]/80 sm:text-[9px]">
            {ambientCopy.retry}
          </span>
        ) : null}
      </button>
      {isOn ? (
        <button
          type="button"
          aria-pressed={isMuted}
          onClick={handleMuteClick}
          onPointerDown={handleMutePointerDown}
          onTouchStart={handleMuteTouchStart}
          title={isMuted ? ambientCopy.unmuteTitle : ambientCopy.muteTitle}
          className="lab-button border border-white/12 bg-[#07080d]/78 px-2 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-[#f5f5f5]/74 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#ff4fa3]/70 hover:text-white sm:px-3 sm:py-2 sm:text-xs sm:tracking-[0.12em]"
        >
          {isMuted ? ambientCopy.unmute : ambientCopy.mute}
        </button>
      ) : null}
    </div>
  );
}
