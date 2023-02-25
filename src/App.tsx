import React from "react";
import styles from "./App.module.css";
import ArtistProfile from "./artist";

function App() {
  return (
    <div className={styles.App_Wrapper}>
      <ArtistProfile />
    </div>
  );
}

export default App;
