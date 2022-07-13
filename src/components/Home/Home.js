import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { fetchingVideos } from "../../services/video.service";
import VideoModal from "./VideoModal";
import List from "../List/List";
import { uploadDemoVideos } from "../../services/video.service";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  //Loading the videos from localStorage if there are any
  const [videos, setVideos] = useState(() => {
    const localData = localStorage.getItem("videos");
    return localData ? JSON.parse(localData) : [];
  });

  const [error, setError] = useState(false);

  //show is false or a link instead of true
  const [show, setShow] = useState(false);

  //Uploading the videos to the localStorage
  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  const handleShow = (link) => setShow(link);
  const handleClose = () => setShow(false);

  const inputHandler = (e) => {
    setError(false);
    setInputValue(e.target.value);
  };

  //I need to have this function separately cuz i will use it also to upload demo videos
  const fetchHandler = async (isVimeo, id, isJustID) => {
    const theVideo = await fetchingVideos(isVimeo, id, isJustID);
    if (!theVideo) {
      setError(true);
      return;
    }
    setVideos((prev) => [...prev, theVideo]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //Just a dummy validation
    if (inputValue.length < 5) {
      setError(true);
      return;
    }
    //Id of the video
    let id;

    //This is just the logic to recognize if the video is from viemo or from youtube or its just id
    let isVimeo = false;
    let isJustID = false;
    //In case of youtube full link
    if (inputValue.includes("watch") && inputValue.includes("youtu")) {
      id = inputValue.split("=")[1];
    }
    //In case of yotube short link
    if (!inputValue.includes("watch") && inputValue.includes("youtu")) {
      id = inputValue.split("/")[3];
    }
    //In case of vimeo
    if (inputValue.includes("vimeo")) {
      id = inputValue.split("/")[3];
      isVimeo = true;
    }
    //In case of just ID
    if (!inputValue.includes("vimeo") && !inputValue.includes("youtu")) {
      id = inputValue;
      isJustID = true;
    }

    //Fetching the data from youtube/vimeo api and getting video object
    fetchHandler(isVimeo, id, isJustID);

    setInputValue("");
  };

  return (
    <div className={styles.homeWrapper}>
      <form onSubmit={submitHandler}>
        <div>
          <input
            value={inputValue}
            className={styles.input}
            onChange={inputHandler}
          />
          {error && <span>Ten link jest nieprawidłowy!</span>}
        </div>
        <button type="submit">Add</button>
      </form>
      <div className={styles.demoBtnContainer}>
        <button onClick={() => uploadDemoVideos(fetchHandler)}>
          Wgraj przykładowe filmy
        </button>
      </div>
      <List videos={videos} setVideos={setVideos} onHandleShow={handleShow} />

      <VideoModal onShow={show} onHandleClose={handleClose} />
    </div>
  );
};

export default Home;
