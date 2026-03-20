const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-shell">
      <label className="search-label" htmlFor="user-search">
        Search users
      </label>
      <input
        id="user-search"
        className="search-input"
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
