import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer/AudioPlayer.js";
import "../Results/Results.css";

export default function Results({ results, SearchAdd, isDark }) {
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
        <h2
          className="title-word"
          style={{
            color: isDark ? "var(--primary-dark)" : "#eaddfc",
            background: isDark ? "var(--bg-dark2)" : "var(--primary)",
          }}
        >
          {results.word} <span>{results.phonetic}</span> 🌟
        </h2>
        <section
          className="phonetic"
          style={{
            backgroundColor: isDark ? "var(--bg-dark2)" : "var(--bg-light2)",
          }}
        >
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
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3` ||
                    phonetic.audio ===
                      `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-uk.mp3`
                      ? "British English (UK):"
                      : phonetic.audio ===
                          `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-us.mp3` ||
                        phonetic.audio ===
                          `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-us.mp3`
                      ? "American English (US)"
                      : phonetic.audio ===
                          `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-au.mp3` ||
                        phonetic.audio ===
                          `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-au.mp3`
                      ? "Australian English (AU):"
                      : null}
                  </span>
                  <audio
                    controls
                    preload="metadata"
                    src={phonetic.audio}
                    title={
                      phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-uk.mp3` ||
                      phonetic.audio ===
                        `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-uk.mp3`
                        ? "Listen UK"
                        : phonetic.audio ===
                            `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-us.mp3` ||
                          phonetic.audio ===
                            `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-us.mp3`
                        ? "Listen US"
                        : phonetic.audio ===
                            `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-au.mp3` ||
                          phonetic.audio ===
                            `https://api.dictionaryapi.dev/media/pronunciations/en/${results.word}-1-au.mp3`
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
            <div
              className="item"
              key={i}
              style={{
                // backgroundColor: isDark
                // ? "var(--bg-dark2)"
                // : "var(--bg-light2)",

                backgroundColor: selected === i && item ? "--bg-dark2" : "none",
              }}
            >
              <div
                className="item-title"
                style={{
                  color: isDark ? "var(--primary-dark)" : "var(--primary)",
                }}
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
                    <div
                      className="singleMean"
                      key={i}
                      style={{
                        color: isDark ? "var(--bg-light)" : "var(--primary)",
                        backgroundColor: isDark
                          ? "var(--bg-dark2)"
                          : "var(--bg-light2)",
                        border: isDark
                          ? "1px solid var(--primary-dark)"
                          : "1px solid var(--primary)",
                        boxShadow: isDark
                          ? "2px 2px 4px 0px var(--primary-dark)"
                          : "2px 2px 4px 0px var(--primary)",
                      }}
                    >
                      <span className="definition">
                        <strong>
                          {i + 1}
                          {". "}Definition:
                        </strong>{" "}
                        {definition.definition}
                        {definition.example && (
                          <span className="example">
                            <span>Example:</span> e.g. {definition.example}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
                {item.synonyms.length > 0 && (
                  <div className="Synonyms">
                    <span
                      style={{
                        color: isDark ? "var(--primary-dark)" : "#eaddfc",
                        background: isDark
                          ? "var(--bg-dark2)"
                          : "var(--primary)",
                      }}
                    >
                      Synonyms:
                    </span>
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
                    <span
                      style={{
                        color: isDark ? "var(--primary-dark)" : "#eaddfc",
                        background: isDark
                          ? "var(--bg-dark2)"
                          : "var(--primary)",
                      }}
                    >
                      Antonyms:
                    </span>
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
