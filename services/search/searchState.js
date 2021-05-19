import React, { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [params, setParams] = useState(null);

  useEffect(() => {
    setParams({
      campus: "dungu",
      maxPrice: 100000,
      compare: [],
    });
  }, []);

  return (
    <SearchContext.Provider value={{ params, setParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useParams = () => useContext(SearchContext);
