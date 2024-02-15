import { useUsers } from "../../../context/UsersContext";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { handleSearch } from "../usersSlice";

export function UserSearch() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { isLoading, error } = user;
  return (
    <div>
      <label
        data-testid="search-label"
        htmlFor="search"
        className="search-label"
      >
        Search User:
      </label>
      <input
        data-testid="search-input"
        disabled={isLoading || !!error}
        className="search-input"
        id="search"
        type="search"
        onChange={(e) => dispatch(handleSearch(e.target.value))}
      />
    </div>
  );
}
