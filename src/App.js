import React, { useState } from "react";
import Quiz from "./Quiz";
import MyContext from "./context";
function App() {
  const [trackIndex, setTrackIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <MyContext.Provider
      value={{ trackIndex, setTrackIndex, isPlaying, setIsPlaying }}
    >
      <Quiz />
    </MyContext.Provider>
  );
}

export default App;
