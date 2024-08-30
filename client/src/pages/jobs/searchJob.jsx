import React from 'react';
import { FaHandPointLeft, FaSearch } from "react-icons/fa";

function SearchJob({input, handleInput}) {
  return (
    <div className="my-4 relative w-3/4">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <FaSearch className="text-gray-500 text-xl" />
      </div>
      <input
        type="search"
        value={input}
        onChange={handleInput}
        placeholder="Search for jobs"
        className="pl-10 w-full p-2 border-2 py-2 bg-transparent rounded-full shadow-sm"
      />
    </div>
  );
}

export default SearchJob;
