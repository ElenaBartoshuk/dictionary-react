import React, { useState } from "react";
import axios from "axios";
import Results from "./Results/Results.js";
import "../Dictionary/Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);

  function handleResponse(response) {
    console.log(response.data[0]);
    setResults(response.data[0]);
  }

  function Search(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <form onSubmit={Search}>
        <input type="Search" autoFocus={true} onChange={handleKeywordChange} />
        <button type="">Search</button>
      </form>
      <Results results={results} />
    </div>
  );
}
