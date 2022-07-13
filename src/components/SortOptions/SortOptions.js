import styles from "./sortOptions.module.css";

const SortOptions = ({
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
        <button onClick={() => sortStateSwitcher("oldest")}>Najstarsze</button>
        <button onClick={() => sortStateSwitcher("latest")}>
          Ostatnio dodane
        </button>
        {favVideos.length > 0 && (
          <button onClick={() => sortStateSwitcher("fav")}>Ulubione</button>
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
