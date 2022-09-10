import React from "react";
import Dictionary from "./Dictionary/Dictionary.js";
import Footer from "./Footer/Footer.js";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="App_content">
          <main>
            <Dictionary />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
