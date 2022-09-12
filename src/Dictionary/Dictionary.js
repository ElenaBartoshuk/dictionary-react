import React, { useState } from "react";
import axios from "axios";
import Results from "./Results/Results.js";
import Photos from "./Photos/Photos.js";
import { toast } from "react-toastify";
import { MagnifyingGlass } from "react-loader-spinner";

import "../Dictionary/Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("beach");
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);

  function handleResponse(response) {
    if (response.data) {
      setResults(response.data[0]);
      searchImages();
    }
  }

  function handlePexelsResponse(response) {
    if (response.data) {
      setPhotos(response.data.photos);
      setKeyword("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (keyword.length > 0) {
      Search();
    } else {
      alert(`🙌 Please enter a word`);
    }
  }

  let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

  function Search(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    axios.get(apiUrl).then(handleResponse).catch(error);
  }

  function searchImages() {
    let pexelsApiKey =
      "563492ad6f91700001000001bc1878da3ccc4a229c4cf2524dd22df8";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=8`;
    let headers = { Authorization: `${pexelsApiKey}` };
    axios
      .get(pexelsApiUrl, { headers: headers })
      .then(handlePexelsResponse)
      .catch(error);
  }

  function error(error) {
    if (error && keyword.length > 0) {
      setResults(null);
      setPhotos([]);
      setKeyword("");
      toast.error(`❗️Sorry, we can't find the definition of "${
        keyword.charAt(0).toUpperCase() + keyword.slice(1)
      }". 
Please type the correct word`);
    }
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value.trim());
  }

  function load() {
    Search();
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="Dictionary">
        <span className="title">{keyword ? keyword : "Dictionary"}</span>
        <form onSubmit={handleSubmit}>
          <input
            type="Search"
            value={keyword}
            autoFocus={true}
            onChange={handleKeywordChange}
          />
          <button type="">Search</button>
        </form>
        <Results results={results} keyword={keyword} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return (
      <div className="Dictionary">
        <span className="title">{keyword ? keyword : "Dictionary"}</span>
        <form onSubmit={handleSubmit}>
          <input
            type="Search"
            value={keyword}
            autoFocus={true}
            onChange={handleKeywordChange}
          />
          <button type="">Search</button>
        </form>
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }
}
