import React, { useState, useEffect } from "react";
import axios from "axios";
import AppLoader from "../AppLoader/AppLoader";
import SearchResultUser from "./SearchResultUser/SearchResultUser";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function searchUsers() {
      setLoading(true);
      const { data } = await axios(`/users?username=${query}`);
      if (!query) {
        setUsers([]);
        setLoading(false);
        return;
      }
      setUsers(data);
      setLoading(false);
    }

    const timer = setTimeout(searchUsers, 1000);

    return () => clearTimeout(timer);
  }, [query]);
  return (
    <div>
      <input
        type="text"
        placeholder="Find users"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <hr />
          <SearchResultUser users={users} />
        </>
      )}
    </div>
  );
};

export default Search;
