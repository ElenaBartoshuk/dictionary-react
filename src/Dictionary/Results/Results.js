import React from "react";
import Meaning from "./Meaning/Meaning.js";
import Phonetic from "./Phonetic";

import "../Results/Results.css";

export default function Results({ results }) {
  if (results) {
    return (
      <div className="Results">
        <h2>
          {results.word}
          {results.phonetics.map(function (phonetic, index) {
            return (
              <div key={index}>
                <Phonetic phonetic={phonetic} />
              </div>
            );
          })}
          🌟
        </h2>
        {results.meanings.map(function (meaning, index) {
          return (
            <div key={index}>
              <Meaning meaning={meaning} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
