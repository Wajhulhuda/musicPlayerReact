import "./App.css";
import { useRef, useEffect, useContext } from "react";
import despacito from "./sounds/Despacito.mp3";
import harmony from "./sounds/harmony.mp3";
import waka from "./sounds/WakaWaka.mp3";
import { ReactComponent as Prev } from "./controls/prev.svg";
import { ReactComponent as Pause } from "./controls/pause.svg";
import { ReactComponent as Play } from "./controls/play.svg";
import { ReactComponent as Next } from "./controls/next.svg";
import MyContext from "./context";
function Quiz() {
  const data = [
    {
      title: "fifth harmony",
      audioSrc: harmony,
      play: false,
    },
    {
      title: "despacito || pasito",
      audioSrc: despacito,
      play: false,
    },
    {
      title: "waka waka || Shakira",
      audioSrc: waka,
      play: false,
    },
  ];
  const { trackIndex, setTrackIndex, isPlaying, setIsPlaying } =
    useContext(MyContext);
  const { audioSrc } = data[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(data.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < data.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      isReady.current = true;
    }
    // eslint-disable-next-line
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      // eslint-disable-next-line
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="App">
      <div>
        {data.map((elem, index) => {
          return (
            <div className="song-list" key={index}>
              <button type="button" className="play butto" aria-label="Play">
                <Play />
              </button>

              <p>{elem.title}</p>
            </div>
          );
        })}
      </div>
      <div className="audio-controls">
        <div className="control">
          <button
            type="button"
            className="prev"
            aria-label="Previous"
            onClick={toPrevTrack}
          >
            <Prev />
          </button>
        </div>
        <div className="control">
          {isPlaying ? (
            <button
              type="button"
              className="pause"
              onClick={() => setIsPlaying(false)}
              aria-label="Pause"
            >
              <Pause />
            </button>
          ) : (
            <button
              type="button"
              className="play"
              onClick={() => setIsPlaying(true)}
              aria-label="Play"
            >
              <Play />
            </button>
          )}
        </div>
        <div className="control">
          <button
            type="button"
            className="next"
            aria-label="Next"
            onClick={toNextTrack}
          >
            <Next />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
