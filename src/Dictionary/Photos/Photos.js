import React from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import "../Photos/Photos.css";

export default function Photos({ photos }) {
  if ({ photos }) {
    const onInit = () => {};
    return (
      <>
        <section className="Photos">
          <LightGallery
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
          >
            {photos.map(function (photo) {
              return (
                <a className="photo-item" href={photo.src.large2x}>
                  <img className="images" src={photo.src.large} alt="" />
                </a>
              );
            })}
          </LightGallery>
        </section>
      </>
    );
  } else {
    return null;
  }
}
