
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          className={css.input}
        />
      </label>
    </div>
  );
};

export default SearchBox;
