import React, { useState } from "react";
// import Phonetic from "./Phonetic";

import "../Results/Results.css";

export default function Results({ results, keyword }) {
  // console.log(results.meanings[0].phonetics[0].audio);
  const [selected, setSelected] = useState(null);

  if (results) {
    const toggle = (i) => {
      if (selected === i) {
        return setSelected(null);
      }
      setSelected(i);
    };

    return (
      <div className="Results">
        <h2>
          {results.word} <span>{results.phonetic}</span> 🌟
        </h2>
        {/* {results.meanings[0] && keyword && (
          <audio
            // style={{ backgroundColor: "blue" }}
            controls
            preload="metadata"
            src={
              // results.meanings[0].phonetics[0] &&
              results.meanings[0].phonetics[0].audio
            }
          ></audio>
        )} */}

        {/* {results.phonetics.map(function (phonetic, index) {
          return (
            <div key={index}>
              <Phonetic phonetic={phonetic} />
            </div>
          );
        })} */}

        <div className="accordion">
          {results.meanings.map((item, i) => (
            <div className="item" key={i}>
              <div className="item-title" onClick={() => toggle(i)}>
                <h3 style={{ textTransform: "uppercase" }}>
                  {item.partOfSpeech}
                </h3>
                <span>{selected === i ? "-" : "+"}</span>
              </div>
              <div className={selected === i ? "content show" : "content"}>
                {item.definitions.slice(0, 4).map((definition, i) => {
                  return (
                    <div className="singleMean" key={i}>
                      <span>
                        <strong>Definition:</strong> {definition.definition}
                        <br />
                        {definition.example && (
                          <span>
                            <em>Example:</em> e.g. {definition.example}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
                {item.synonyms.length > 0 && (
                  <div className="Synonyms">
                    <strong>Synonyms:</strong>
                    <ul className="Synonyms-list">
                      {item.synonyms.map(function (synonym, i) {
                        return <li key={i}>{synonym}</li>;
                      })}
                    </ul>
                  </div>
                )}
                {item.antonyms.length > 0 && (
                  <div className="Antonyms">
                    <strong>Antonyms:</strong>
                    <ul className="Antonyms-list">
                      {item.antonyms.map(function (antonym, i) {
                        return <li key={i}>{antonym}</li>;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
