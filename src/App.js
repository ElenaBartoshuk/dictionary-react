import React, { useState } from "react";
import Dictionary from "./Dictionary/Dictionary.js";
import Footer from "./Footer/Footer.js";
import { ToastContainer } from "react-toastify";
import Switch from "@mui/material/Switch";
import BackToTopButton from "./BackToTopButton";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div
      className="App"
      style={{
        color: isDark ? "var(--color-dark)" : "var(--bg-dark)",
        background: isDark
          ? "var(--bg-dark2)"
          : "linear-gradient(102.7deg,rgb(253, 218, 255, 0.4) 8.2%,rgb(223, 173, 252, 0.4) 19.6%,rgb(173, 205, 252, 0.4) 36.8%,rgb(173, 252, 244, 0.4) 73.2%,rgb(202, 248, 208, 0.4) 90.9%)",
      }}
    >
      <div className="container">
        <div
          className="App_content"
          style={{
            background: isDark ? "#121212" : "#fff",
          }}
        >
          <div className="Switch">
            <span className="Switch-title">
              {isDark ? "Dark" : "Light"} theme
            </span>
            <Switch
              onChange={() => setIsDark(!isDark)}
              {...label}
              title={
                isDark ? `Switch on "Light" theme` : `Switch on "Dark" theme`
              }
            />
          </div>
          <main>
            <Dictionary
              isDark={isDark}
              isHover={isHover}
              setIsDark={setIsDark}
              defaultKeyword={"paradise"}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </main>
          <Footer isDark={isDark} />
          <BackToTopButton />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
