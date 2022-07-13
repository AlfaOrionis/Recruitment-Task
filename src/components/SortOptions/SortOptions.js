import styles from "./sortOptions.module.css";

const SortOptions = ({
  sortState,
  setSortState,
  setDisplay,
  setFirstItemOnPage,
  display,
  favVideos,
  onOpenModalHandler,
}) => {
  const displayToggle = () => {
    setDisplay((prev) => !prev);
  };

  const sortStateSwitcher = (type) => {
    setSortState(type);
    setFirstItemOnPage(0);
  };

  return (
    <div className={styles.optionsListWrapper}>
      <div>
        <span>Pokaż:</span>
        <button
          className={`${sortState === "oldest" && styles.blue}`}
          onClick={() => sortStateSwitcher("oldest")}
        >
          Najstarsze
        </button>
        <button
          className={`${sortState === "latest" && styles.blue}`}
          onClick={() => sortStateSwitcher("latest")}
        >
          Ostatnio dodane
        </button>
        {favVideos.length > 0 && (
          <button
            className={`${sortState === "fav" && styles.red}`}
            onClick={() => sortStateSwitcher("fav")}
          >
            Ulubione
          </button>
        )}
      </div>
      <div>
        <button onClick={displayToggle}>
          {display ? (
            <i className="fa-solid fa-bars" />
          ) : (
            <i className="fa-solid fa-ellipsis" />
          )}
        </button>
        <button className={styles.removeBtn} onClick={onOpenModalHandler}>
          Wyczyść listę <i className="fa-solid fa-eraser"></i>
        </button>
      </div>
    </div>
  );
};

export default SortOptions;
