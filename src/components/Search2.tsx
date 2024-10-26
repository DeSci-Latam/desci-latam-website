import React from 'react';
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const handleClick = () => {
    const event = new CustomEvent('open-search');
    window.dispatchEvent(event);
  };

  return (
    <div id="search-container" className="ms-auto">
      <button
        onClick={handleClick}
        className="search-button flex items-center justify-center rounded-md gap-1 pr-4 p-0 text-muted-foreground hover:scale-125 dark:hover:text-primary transition-transform duration-200"
        aria-label="Buscar"
      >
        <IoSearch className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Search;