import React, { useState } from "react";
import axios from "axios";
import Results from "./Results/Results.js";
import Photos from "./Photos/Photos.js";
import { toast } from "react-toastify";
import { MagnifyingGlass } from "react-loader-spinner";
import dictionary from "../dictionary.png";
import searchIcon from "../search-icon.svg";

import "../Dictionary/Dictionary.css";

export default function Dictionary({ defaultKeyword }) {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);

  function handleResponse(response) {
    // console.log(response.data[0]);
    if (response.data) {
      setResults(response.data[0]);
      // searchImages();
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

    let pexelsApiKey =
      "563492ad6f91700001000001bc1878da3ccc4a229c4cf2524dd22df8";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=8`;
    let headers = { Authorization: `${pexelsApiKey}` };
    axios
      .get(pexelsApiUrl, { headers: headers })
      .then(handlePexelsResponse)
      .catch(error);
  }

  function SearchAdd(event) {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${event.target.innerHTML}`;
    axios.get(apiUrl).then(handleResponse).catch(error);
    let pexelsApiKey =
      "563492ad6f91700001000001bc1878da3ccc4a229c4cf2524dd22df8";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${event.target.innerHTML}&per_page=8`;
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
    } else {
      setPhotos([]);
      toast.error(`❗️Sorry, we can't find the definition of this word`);
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
        <img
          src={dictionary}
          alt="dictionary icon"
          style={{ width: 85, height: 85, margin: "0 auto" }}
        />
        <span className="title">{keyword ? keyword : "Dictionary"}</span>
        <section>
          <form className="search" onSubmit={handleSubmit}>
            <div className="icon__before">
              <img src={searchIcon} alt="search icon" />
              <input
                type="Search"
                value={keyword}
                autoFocus={true}
                placeholder="Enter a word"
                onChange={handleKeywordChange}
                title="Enter the necessary word"
              />
            </div>

            <button className="btn" type="">
              Search
            </button>
          </form>
        </section>
        <Results results={results} SearchAdd={SearchAdd} />
        <Photos photos={photos} />
      </div>
    );
  } else {
    load();
    return (
      <div className="Dictionary">
        <span className="title">{keyword ? keyword : "Dictionary"}</span>
        <form className="search" onSubmit={handleSubmit}>
          <div className="icon__before">
            <img src={searchIcon} alt="search icon" />
            <input
              type="Search"
              value={keyword}
              autoFocus={true}
              placeholder="Enter a word"
              onChange={handleKeywordChange}
            />
          </div>
          <button className="btn" type="submit">
            Search
          </button>
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
