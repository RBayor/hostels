import React, { createContext, useContext, useState, useEffect } from "react";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);
  //TODO: Fix bug that -- item can be added again after reload
  const addToFavs = (hostel) => {
    if (!favs.includes(hostel)) {
      setFavs((prev) => [...prev, hostel]);
    }
  };

  const checkLocal = () => {
    if (localStorage.getItem("favHostels") !== null) {
      setFavs(JSON.parse(localStorage.getItem("favHostels")));
    }
  };

  useEffect(() => {
    if (favs.length > 0) {
      localStorage.setItem("favHostels", JSON.stringify(favs));
    }

    // console.log(favs);
  }, [favs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //   console.log("fetching");
      checkLocal();
    }
  }, []);

  return (
    <FavouriteContext.Provider value={{ addToFavs, favs, setFavs }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavs = () => useContext(FavouriteContext);
