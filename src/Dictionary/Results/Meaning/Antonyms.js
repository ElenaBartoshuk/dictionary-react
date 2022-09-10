import React from "react";

export default function Antonyms({ antonyms }) {
  if (antonyms.length !== 0) {
    return (
      <div className="Antonyms">
        <strong>Antonyms:</strong>
        <ul className="Antonyms-list">
          {antonyms.map(function (antonym, index) {
            return <li key={index}>{antonym}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
