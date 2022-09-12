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
        <Switch onChange={() => setIsDark(!isDark)} {...label} />
        <div
          className="App_content"
          style={{
            background: isDark ? "black" : "white",
          }}
        >
          <main>
            <Dictionary isDark={isDark} setIsDark={setIsDark} />
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
