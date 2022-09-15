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
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div
      className="App"
      style={{
        color: isDark ? "var(--color-dark)" : "var(--bg-dark)",
        // color: isDark ? "var(--primary-dark)" : "var(--primary)",
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
            <span>{isDark ? "Dark" : "Light"} theme</span>
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
              setIsDark={setIsDark}
              defaultKeyword={"beach"}
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
