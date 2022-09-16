import React, { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTopButton && (
        <button className="backtotop" onClick={scrollUp} title="Back to top">
          <svg
            width="17"
            height="30"
            viewBox="0 0 17 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.354 7.89597L15.647 8.60297L8.5 1.45697L1.354 8.60297L0.647 7.89597L8.5 0.0429688L16.354 7.89597Z"
              fill="#3700b3"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
