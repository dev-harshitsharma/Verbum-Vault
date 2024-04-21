import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
 

  return (
    <div className="max-w-full">
      <input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Books"
        className="px-2 border-b border-white text-black ml-5 mt-1 mb-1 rounded-sm "
      />
    </div>
  );
};

export default SearchBar;
