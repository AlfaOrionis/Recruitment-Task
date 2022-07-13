import styles from "./pagination.module.css";

const Pagination = ({
  videos,
  favVideos,
  firstItemOnPage,
  setFirstItemOnPage,
  sortState,
}) => (
  <div className={styles.paginationContainer}>
    <button
      onClick={() => {
        if (firstItemOnPage > 9) {
          setFirstItemOnPage((prev) => prev - 10);
          window.scrollTo(0, 0);
        }
      }}
    >
      <i className="fa-solid fa-arrow-left"></i>
    </button>
    <button>{firstItemOnPage / 10 + 1}</button>
    <button
      onClick={() => {
        if (
          (sortState !== "fav" && firstItemOnPage < videos.length - 10) ||
          (sortState === "fav" && firstItemOnPage < favVideos.length - 10)
        ) {
          setFirstItemOnPage((prev) => prev + 10);
          window.scrollTo(0, 0);
        }
      }}
    >
      <i className="fa-solid fa-arrow-right"></i>
    </button>
  </div>
);

export default Pagination;
