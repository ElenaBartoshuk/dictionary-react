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
        <h2 className="title-word">
          {results.word} <span>{results.phonetic}</span> 🌟
        </h2>
        <section className="phonetic">
          {results.phonetics
            .filter((phonetic) => phonetic.audio !== "")
            .map((phonetic, i) => {
              return (
                <div key={i} className="phonetic-item">
                  <span className="phonetic-player">
                    <AudioPlayer audio={phonetic.audio} word={results.word} />
                  </span>
                  <span className="phonetic-lg">
                    {phonetic.audio ===
                    `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3`
                      ? "British English (UK):"
                      : phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-us.mp3`
                      ? "American English (US)"
                      : phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-au.mp3`
                      ? "Australian English (AU):"
                      : null}
                  </span>
                  <audio
                    controls
                    preload="metadata"
                    src={phonetic.audio}
                    title={
                      phonetic.audio ===
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3`
                        ? "Listen UK"
                        : phonetic.audio ===
                          `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-us.mp3`
                        ? "Listen US"
                        : phonetic.audio ===
                          `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-au.mp3`
                        ? "Listen AU"
                        : null
                    }
                  ></audio>
                </div>
              );
            })}
        </section>
        <section className="accordion">
          {results.meanings.map((item, i) => (
            <div className="item" key={i}>
              <div
                className="item-title"
                onClick={() => toggle(i)}
                title={
                  selected === null &&
                  `View "${results.word}" word definitions as ${item.partOfSpeech}`
                }
              >
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
                      <span className="definition">
                        <strong>
                          {i + 1}
                          {". "}Definition:
                        </strong>{" "}
                        {definition.definition}
                      </span>
                      {definition.example && (
                        <span className="example">
                          <span>Example:</span> e.g. {definition.example}
                        </span>
                      )}
                    </div>
                  );
                })}
                {item.synonyms.length > 0 && (
                  <div className="Synonyms">
                    <span>Synonyms:</span>
                    <ul className="Synonyms-list">
                      {item.synonyms.slice(0, 12).map(function (synonym, i) {
                        return (
                          <li
                            key={i}
                            onClick={SearchAdd}
                            title="View synonym's definitions"
                          >
                            {synonym}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {item.antonyms.length > 0 && (
                  <div className="Antonyms">
                    <span>Antonyms:</span>
                    <ul className="Antonyms-list">
                      {item.antonyms.slice(0, 11).map(function (antonym, i) {
                        return (
                          <li
                            key={i}
                            onClick={SearchAdd}
                            title="View antonym's definitions"
                          >
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
        </section>
      </div>
    );
  } else {
    return null;
  }
}
