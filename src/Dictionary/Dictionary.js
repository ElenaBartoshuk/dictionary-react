import React, { useState } from "react";
import axios from "axios";
import Results from "./Results/Results.js";
import Photos from "./Photos/Photos.js";
import { toast } from "react-toastify";

import "../Dictionary/Dictionary.css";

export default function Dictionary() {
  let [keyword, setKeyword] = useState("");
  let [results, setResults] = useState(null);
  const [photos, setPhotos] = useState([]);

  function handleResponse(response) {
    console.log(response.data[0]);
    setResults(response.data[0]);
  }

  function handleError(error) {
    // console.clear(error);
    toast.error(
      `❗️Sorry, we can't find the definition of "${keyword}". 
Please type the correct word`
    );
  }

  function handlePexelsResponse(response) {
    setPhotos(response.data.photos);
    // setResults("");
  }

  function Search(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse).catch(handleError);

    let pexelsApiKey =
      "563492ad6f91700001000001bc1878da3ccc4a229c4cf2524dd22df8";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
    let headers = { Authorization: `${pexelsApiKey}` };
    axios
      .get(pexelsApiUrl, { headers: headers })
      .then(handlePexelsResponse)
      .catch((error) => {
        console.clear(error);
      });
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value.trim());
  }

  return (
    <div className="Dictionary">
      <span className="title">{keyword ? keyword : "Dictionary"}</span>
      <form onSubmit={Search}>
        <input type="Search" autoFocus={true} onChange={handleKeywordChange} />
        <button type="">Search</button>
      </form>
      <Results results={results} keyword={keyword} />
      <Photos photos={photos} />
    </div>
  );
}
