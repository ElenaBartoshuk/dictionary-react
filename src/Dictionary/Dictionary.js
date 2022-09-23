import React, { useState } from "react";
import axios from "axios";
import Results from "./Results/Results.js";
import Photos from "./Photos/Photos.js";
import { toast } from "react-toastify";
import { MagnifyingGlass } from "react-loader-spinner";
import dictionary from "../dictionary.png";

import "../Dictionary/Dictionary.css";

export default function Dictionary({
  defaultKeyword,
  isDark,
  isHover,
  handleMouseEnter,
  handleMouseLeave,
}) {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(undefined);

  function handleResponse(response) {
    if (response.data) {
      setResults(response.data[0]);
      window.scrollTo({
        top: 100,
        behavior: "smooth",
      });
    }
  }

  function handlePexelsResponse(response) {
    if (response.data.photos.length !== 0) {
      setPhotos(response.data.photos);
      setKeyword("");
    } else {
      setPhotos([]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (keyword.length > 0) {
      Search();
      setSelected(undefined);
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
    setSelected(undefined);
  }

  function error(error) {
    if (error && keyword.length > 0) {
      setResults(null);
      setKeyword("");
      toast.error(`❗️Sorry, we can't find the definition of "${
        keyword.charAt(0).toUpperCase() + keyword.slice(1)
      }". 
Please type the correct word`);
    } else {
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
          className="Dictionary-img"
          src={dictionary}
          alt="dictionary icon"
        />
        <span
          className="title"
          style={{
            color: isDark ? "var(--primary-dark)" : "var(--primary)",
          }}
        >
          {keyword ? keyword : "Dictionary"}
        </span>
        <section
          style={{
            backgroundColor: isDark ? "var(--bg-dark2)" : "var(--bg-light2)",
          }}
        >
          <form className="search" onSubmit={handleSubmit}>
            <div className="icon__before">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill={isDark ? "#bb86fc" : "#03dac6"}
                  d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                />
              </svg>
              <input
                type="Search"
                value={keyword}
                autoFocus={true}
                placeholder="Enter a word"
                onChange={handleKeywordChange}
                title="Enter the necessary word"
                style={{
                  border: isDark
                    ? "2px solid var(--primary-dark)"
                    : "1px solid var(--accent)",
                  boxShadow: isDark
                    ? "1px 2px 4px 0px var(--primary-dark)"
                    : "0 2px 10px var(--accent)",
                }}
              />
            </div>

            <button className="btn" type="">
              Search
            </button>
          </form>
        </section>
        <Results
          results={results}
          SearchAdd={SearchAdd}
          isDark={isDark}
          isHover={isHover}
          selected={selected}
          setSelected={setSelected}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        {photos.length !== 0 ? <Photos photos={photos} /> : undefined}
      </div>
    );
  } else {
    load();
    return (
      <div className="Dictionary">
        <span className="title">{keyword ? keyword : "Dictionary"}</span>
        <form className="search" onSubmit={handleSubmit}>
          <div className="icon__before">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill={isDark ? "#bb86fc" : "#03dac6"}
                d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
              />
            </svg>

            <input
              type="Search"
              value={keyword}
              autoFocus={true}
              placeholder="Enter a word"
              onChange={handleKeywordChange}
              title="Enter the necessary word"
              style={{
                border: isDark
                  ? "2px solid var(--primary-dark)"
                  : "1px solid var(--accent)",
              }}
            />
          </div>

          <button className="btn" type="">
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
