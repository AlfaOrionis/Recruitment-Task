import styles from "./listItem.module.css";

import { addToFavourites, removeItem } from "../../services/video.service";

const ListItem = ({ video, videos, setVideos, display, onHandleShow }) => {
  const addToFavouritesHandler = (video) => {
    addToFavourites(video, videos, setVideos);
  };
  const removeItemHandler = (video) => {
    removeItem(video, videos, setVideos);
  };
  return (
    <li className={`${styles.itemContainer} ${display && styles.column}`}>
      <img
        className={`${styles.thumbnail} ${display && styles.column}`}
        key={video.upload_date}
        src={display ? video.img_high : video.img_medium}
        alt={video.title}
        onClick={() =>
          onHandleShow(
            video.type === "youtube"
              ? `https://www.youtube.com/embed/${video.id}`
              : `https://player.vimeo.com/video/${video.id}`
          )
        }
      />

      <div
        className={`${styles.descriptionWrapper} ${display && styles.column}`}
      >
        <div>
          <h2>{video.title}</h2>
          <div className={styles.infoContainer}>
            <p>{new Date(video.upload_date).toLocaleString()}</p>
            <p>{new Date(video.creation_date).toLocaleDateString()}</p>
            <p>{video.views} wyświetleń</p>
            <p>{video.likes} polubień</p>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <button
            style={video.favourite === true ? { color: "red" } : {}}
            onClick={() => addToFavouritesHandler(video)}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
          <button onClick={() => removeItemHandler(video)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
