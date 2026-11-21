"use client";

import Image, { type ImageProps } from "next/image";
import { createContext, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "formda30-athlete";
type Athlete = "male" | "female";
const AthleteContext = createContext<Athlete>("male");

let fallback: Athlete = "male";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readAthlete(): Athlete {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "female" ? "female" : "male";
  } catch {
    return fallback;
  }
}

function saveAthlete(athlete: Athlete) {
  fallback = athlete;
  try {
    window.localStorage.setItem(STORAGE_KEY, athlete);
  } catch {}
  listeners.forEach((listener) => listener());
}

export function AthleteProvider({ children }: { children: React.ReactNode }) {
  const athlete = useSyncExternalStore(subscribe, readAthlete, () => "male" as const);
  return <AthleteContext.Provider value={athlete}>{children}</AthleteContext.Provider>;
}

export function AthleteSelect() {
  const athlete = useContext(AthleteContext);
  return (
    <label className="athlete-select">
      <span className="sr-only">Cinsiyet seçimi</span>
      <select value={athlete} onChange={(event) => saveAthlete(event.target.value === "female" ? "female" : "male")}>
        <option value="male">Erkek</option>
        <option value="female">Kadın</option>
      </select>
    </label>
  );
}

export function AthleteImage({ src, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  const athlete = useContext(AthleteContext);
  return <Image {...props} src={athlete === "male" ? src.replace("/images/", "/images/male/") : src} />;
}
