import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function AudioPlayer({ audio, word }) {
  const audioTrack = new Audio(audio);
  const start = () => {
    audioTrack.play();
  };
  return (
    <FontAwesomeIcon
      icon={faVolumeHigh}
      onClick={start}
      className="SoundIcon"
      title={
        audio ===
          `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-uk.mp3` ||
        audio ===
          `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-1-uk.mp3`
          ? "Listen UK"
          : audio ===
              `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-us.mp3` ||
            audio ===
              `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-1-us.mp3`
          ? "Listen US"
          : audio ===
              `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-au.mp3` ||
            audio ===
              `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-1-au.mp3`
          ? "Listen AU"
          : null
      }
    />
  );
}
