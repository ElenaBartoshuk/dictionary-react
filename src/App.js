import React, { useState } from "react";
import Dictionary from "./Dictionary/Dictionary.js";
import Footer from "./Footer/Footer.js";
import { ToastContainer } from "react-toastify";
import Switch from "@mui/material/Switch";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isDark, setIsDark] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div
      className="App"
      style={{
        color: isDark ? "white" : "black",
      }}
    >
      <div className="container">
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
        <div
          className="App_content"
          style={{
            background: isDark ? "black" : "white",
          }}
        >
          <main>
            <Dictionary
              isDark={isDark}
              setIsDark={setIsDark}
              defaultKeyword={"beach"}
            />
          </main>
          <Footer />
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
