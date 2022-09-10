import React from "react";
import "../Photos/Photos.css";

export default function Photos({ photos }) {
  if ({ photos }) {
    return (
      <section className="Photos">
        {photos.map(function (photo, index) {
          return (
            <div key={index}>
              <a href={photo.src.original} target="_blank" rel="noreferrer">
                <img src={photo.src.landscape} alt="" />
              </a>
            </div>
          );
        })}
      </section>
    );
  } else {
    return null;
  }
}
