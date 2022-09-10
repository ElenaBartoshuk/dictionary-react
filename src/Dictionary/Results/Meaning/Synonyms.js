import React from "react";

export default function Synonyms({ synonyms }) {
  if (synonyms.length !== 0) {
    return (
      <div className="Synonyms">
        <strong>Synonyms:</strong>
        <ul className="Synonyms-list">
          {synonyms.map(function (synonym, index) {
            return <li key={index}>{synonym}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
