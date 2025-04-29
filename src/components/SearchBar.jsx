import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center justify-center mb-4"
    >
      <input
        type="text"
        className="w-36 p-1 px-3 rounded-full border border-gray-400 bg-white text-black placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition"
        placeholder="City name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
