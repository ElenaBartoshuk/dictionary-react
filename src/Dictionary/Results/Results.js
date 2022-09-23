import React, { useState } from "react";
import "../Results/Results.css";
import Phonetic from "../Results/Phonetic.js";

export default function Results({
  results,
  SearchAdd,
  isDark,
  isHover,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const [selected, setSelected] = useState(undefined);

  if (results) {
    const toggle = (i) => {
      selected === i ? setSelected(undefined) : setSelected(i);
    };

    return (
      <div className="Results">
        <h2
          className="title-word"
          style={{
            color: isDark ? "var(--primary-dark)" : "#eaddfc",
            background: isDark ? "var(--bg-dark2)" : "var(--primary)",
            boxShadow: isDark
              ? "0 2px 10px var(--primary-dark)"
              : "0 2px 4px var(--primary)",
          }}
        >
          {results.word} <span>{results.phonetic}</span> 🌟
        </h2>

        {(results.phonetics.length === 1 &&
          results.phonetics[0].audio !== "") ||
        (results.phonetics.length > 1 && results.phonetics[0].audio !== "") ||
        (results.phonetics.length > 1 && results.phonetics[1].audio !== "") ||
        (results.phonetics.length > 1 && results.phonetics[2].audio !== "") ? (
          <Phonetic
            results={results}
            isDark={isDark}
            isHover={isHover}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        ) : undefined}
        <section className="accordion">
          {results.meanings.map((item, i) => (
            <div
              className="item"
              key={i}
              style={{
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
                  selected === undefined
                    ? `View "${results.word}" word definitions as ${item.partOfSpeech}`
                    : undefined
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
                        color: isDark ? "var(--bg-light)" : "var(--bg-dark)",
                        backgroundColor: isDark
                          ? "var(--bg-dark2)"
                          : "var(--bg-light2)",
                        border: isDark
                          ? "1px solid var(--primary-dark)"
                          : "1px solid var(--primary)",
                        boxShadow: isDark
                          ? "1px 2px 4px 0px var(--primary-dark)"
                          : "1px 2px 4px 0px var(--primary)",
                      }}
                    >
                      <span className="definition">
                        <strong className="definition-title">
                          {i + 1}
                          {". "}Definition:
                        </strong>{" "}
                        {definition.definition}
                        {definition.example && (
                          <span className="example">
                            <span
                              style={{
                                color: isDark
                                  ? "var(--primary-dark)"
                                  : "var(--primary)",
                              }}
                            >
                              Example:
                            </span>{" "}
                            e.g. {definition.example}
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
                        color: isDark
                          ? "var(--primary-dark)"
                          : "var(--primary)",
                        background: isDark
                          ? "var(--bg-dark2)"
                          : "var(--bg-light)",
                        boxShadow: isDark
                          ? "0 2px 5px var(--primary-dark)"
                          : "0 2px 10px var(--accent)",
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
                            style={{
                              color: isDark
                                ? "var(--color-dark)"
                                : "var(--primary)",
                              backgroundColor: isDark
                                ? "var(--bg-dark2)"
                                : "var(--color-dark)",
                              boxShadow: isDark
                                ? "0 2px 10px var(--accent)"
                                : "0 2px 4px var(--primary)",
                            }}
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
                        color: isDark
                          ? "var(--primary-dark)"
                          : "var(--primary)",
                        background: isDark
                          ? "var(--bg-dark2)"
                          : "var(--bg-light)",
                        boxShadow: isDark
                          ? "0 2px 5px var(--primary-dark)"
                          : "0 2px 10px var(--accent)",
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
                            style={{
                              color: isDark
                                ? "var(--color-dark)"
                                : "var(--primary)",
                              backgroundColor: isDark
                                ? "var(--bg-dark2)"
                                : "var(--color-dark)",
                              boxShadow: isDark
                                ? "0 2px 10px var(--accent)"
                                : "0 2px 4px var(--primary)",
                            }}
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
