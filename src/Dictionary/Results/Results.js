import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer.js";
import "../Results/Results.css";

export default function Results({ results, SearchAdd }) {
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
        {results.phonetics
          .filter((phonetic) => phonetic.audio !== "")
          .map((phonetic, i) => {
            return (
              <div key={i}>
                <div className="Phonetic">
                  <span>
                    {phonetic.audio ===
                    `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3`
                      ? "British English (UK): "
                      : "American English (US): "}
                  </span>
                  <span>
                    <AudioPlayer audio={phonetic.audio} />
                  </span>
                  <audio
                    controls
                    preload="metadata"
                    src={phonetic.audio}
                  ></audio>
                </div>
              </div>
            );
          })}
        <div className="accordion">
          {results.meanings.map((item, i) => (
            <div className="item" key={i}>
              <div className="item-title" onClick={() => toggle(i)}>
                <h3 style={{ textTransform: "uppercase" }}>
                  {item.partOfSpeech}
                </h3>
                <span>{selected === i ? "-" : "+"}</span>
              </div>
              <div
                className={selected === i && item ? "content show" : "content"}
              >
                {item.definitions.slice(0, 4).map((definition, i) => {
                  return (
                    <div className="singleMean" key={i}>
                      <span>
                        <strong>
                          {i + 1}
                          {". "}Definition:
                        </strong>{" "}
                        {definition.definition}
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
                        return (
                          <li key={i} onClick={SearchAdd}>
                            {synonym}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {item.antonyms.length > 0 && (
                  <div className="Antonyms">
                    <strong>Antonyms:</strong>
                    <ul className="Antonyms-list">
                      {item.antonyms.map(function (antonym, i) {
                        return (
                          <li key={i} onClick={SearchAdd}>
                            {antonym}
                          </li>
                        );
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
