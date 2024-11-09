import React from "react";

const SearchBar = ({
  ingredient,
  handleInputChange,
  handleMicClick,
  listening,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        placeholder={ingredient ? "" : " Search by ingredient...(e.g. chicken)"}
        value={ingredient}
        onChange={handleInputChange}
        className="p-3 w-full md:w-96 border-2 border-indigo-300 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
      />
      <button
        onClick={handleMicClick}
        className={`p-3 bg-indigo-600 text-white rounded-full transition ${
          listening ? "animate-pulse" : ""
        }`}
        disabled={listening}
      >
        {listening ? "Listening..." : "🎤"}
      </button>
    </div>
  );
};

export default SearchBar;
