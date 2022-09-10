import React from "react";

export default function Phonetic({ phonetic }) {
  return (
    <div className="Phonetic">
      <audio controls preload="metadata" src={phonetic.audio}></audio>
      <br />
      {phonetic.text}
    </div>
  );
}
