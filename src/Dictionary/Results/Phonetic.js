import React from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer.js";

export default function Phonetic({
  results,
  isDark,
  isHover,
  handleMouseEnter,
  handleMouseLeave,
}) {
  return (
    <section
      className="phonetic"
      style={{
        backgroundColor: isDark ? "var(--bg-dark2)" : "var(--bg-light2)",
      }}
    >
      {results.phonetics
        .filter((phonetic) => phonetic.audio !== "")
        .map((phonetic, i) => {
          return (
            <div key={i} className="phonetic-item">
              <span className="phonetic-player">
                <AudioPlayer
                  audio={phonetic.audio}
                  word={results.word}
                  isDark={isDark}
                  isHover={isHover}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              </span>
              <span className="phonetic-lg">
                {phonetic.audio ===
                  `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3` ||
                phonetic.audio ===
                  `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-uk.mp3`
                  ? "British English (UK):"
                  : phonetic.audio ===
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-us.mp3` ||
                    phonetic.audio ===
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-us.mp3`
                  ? "American English (US):"
                  : phonetic.audio ===
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-au.mp3` ||
                    phonetic.audio ===
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-au.mp3`
                  ? "Australian English (AU):"
                  : null}
              </span>
              <audio
                controls
                preload="metadata"
                src={phonetic.audio}
                title={
                  phonetic.audio ===
                    `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3` ||
                  phonetic.audio ===
                    `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-uk.mp3`
                    ? "Listen UK"
                    : phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-us.mp3` ||
                      phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-us.mp3`
                    ? "Listen US"
                    : phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-au.mp3` ||
                      phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-au.mp3`
                    ? "Listen AU"
                    : null
                }
              ></audio>
            </div>
          );
        })}
    </section>
  );
}
