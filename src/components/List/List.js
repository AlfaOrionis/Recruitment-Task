import { useEffect, useState } from "react";
import styles from "./list.module.css";
import ListItem from "../ListItem/ListItem";
import Pagination from "../Pagination/Pagination";
import RemoveAllModal from "./RemoveAllModal";
import SortOptions from "../SortOptions/SortOptions";
import uniqid from "uniqid";

const FormList = ({ videos, setVideos, onHandleShow }) => {
  const [firstItemOnPage, setFirstItemOnPage] = useState(0);
  //This state is controlling the display order
  const [sortState, setSortState] = useState("oldest");

  //false is row, true is column
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);

  //This useEffect job is to go back to previous page, in case if u delete the only video on the page, so u dont end up being left on an empty page (expect its the first page and there is no video)
  useEffect(() => {
    if (firstItemOnPage === videos.length && videos.length > 0) {
      setFirstItemOnPage((prev) => prev - 10);
    }
  }, [videos.length, firstItemOnPage]);

  //Same thing as above
  const favVideos = videos.filter((video) => video.favourite);
  useEffect(() => {
    if (sortState === "fav" && favVideos.length === 0) {
      setSortState("oldest");
    }
  }, [favVideos, sortState]);

  const openModalHandler = () => {
    setShow(true);
  };
  const closeModalHandler = () => {
    setShow(false);
  };

  const removeAllHandler = () => {
    setVideos([]);
    closeModalHandler();
  };
  const videosPerPage = 10;
  const pagination = () => {
    if (
      (sortState !== "fav" && videos.length > videosPerPage) ||
      (sortState === "fav" && favVideos.length > videosPerPage)
    )
      return (
        <Pagination
          sortState={sortState}
          videos={videos}
          favVideos={favVideos}
          firstItemOnPage={firstItemOnPage}
          setFirstItemOnPage={setFirstItemOnPage}
        />
      );
  };

  const videosToDisplay = () => {
    //Sorting videos
    const sortedVideos = () => {
      if (sortState === "oldest") return videos;

      if (sortState === "latest") {
        const videoList = [...videos];
        return videoList.sort((a, b) => {
          if (a.upload_date > b.upload_date) return -1;
        });
      }
      if (sortState === "fav") {
        return favVideos;
      }
    };
    //Now i will paginate the videos
    return sortedVideos().slice(firstItemOnPage, firstItemOnPage + 10);
  };
  return (
    <>
      <SortOptions
        setSortState={setSortState}
        favVideos={favVideos}
        display={display}
        setDisplay={setDisplay}
        setFirstItemOnPage={setFirstItemOnPage}
        onOpenModalHandler={openModalHandler}
      />
      <ul className={`${styles.listWrapper} ${display && styles.column}`}>
        {videosToDisplay().map((video) => {
          return (
            <ListItem
              key={uniqid()}
              video={video}
              display={display}
              onHandleShow={onHandleShow}
              videos={videos}
              setVideos={setVideos}
            />
          );
        })}
      </ul>
      {pagination()}
      <RemoveAllModal
        show={show}
        onCloseModalHandler={closeModalHandler}
        onRemoveAllHandler={removeAllHandler}
      />
    </>
  );
};

export default FormList;
