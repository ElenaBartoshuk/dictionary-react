import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function AudioPlayer({ audio }) {
  const audioTrack = new Audio(audio);
  const start = () => {
    audioTrack.play();
  };
  return <FontAwesomeIcon icon={faVolumeHigh} onClick={start} />;
}
