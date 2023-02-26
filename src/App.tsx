import React from "react";
import styles from "./App.module.css";
import Artist from "./artist";

function App() {
  return (
    <div className={styles.App_Wrapper}>
      <Artist />
    </div>
  );
}

export default App;
