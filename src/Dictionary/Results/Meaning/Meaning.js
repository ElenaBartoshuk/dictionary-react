import React from "react";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";

import "../Meaning/Meaning.css";

export default function Meaning({ meaning }) {
  return (
    <div className="Meaning">
      <h3>{meaning.partOfSpeech}</h3>
      {meaning.definitions.slice(0, 4).map(function (definition, index) {
        if (definition.example) {
          return (
            <div key={index}>
              <p>
                <strong>Definition:</strong> {definition.definition}
                <br />
                <em>Example:</em> e.g. {definition.example}
              </p>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <p>
                <strong>Definition:</strong> {definition.definition}
              </p>
            </div>
          );
        }
      })}
      <Synonyms synonyms={meaning.synonyms} />
      <Antonyms antonyms={meaning.antonyms} />
    </div>
  );
  //
}
