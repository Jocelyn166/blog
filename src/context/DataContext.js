import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

 

  return (
    <DataContext.Provider
      value={{
        search,
        searchResults,
        setSearch,
        posts,
        setSearchResults,
        setPosts,
        fetchError,
        isLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
