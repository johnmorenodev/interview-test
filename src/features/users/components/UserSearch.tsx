import { useUsers } from "../../../context/UsersContext";

export function UserSearch() {
  const { handleSearch, isLoading, error } = useUsers();
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
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
