import React from "react";

export default function Phonetic({ phonetic }) {
  return (
    <div className="Phonetic">
      {phonetic.text}🌟
      <br />
      <audio controls preload="metadata" src={phonetic.audio}></audio>
    </div>
  );
}
