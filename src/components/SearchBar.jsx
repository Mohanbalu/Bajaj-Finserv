import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, doctors }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm && doctors) {
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
        .map(doctor => ({
          name: doctor.name,
          specialty: doctor.specialities?.[0]?.name || '',
          image: doctor.photo || ''
        }));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <div className="relative">
        <input
          type="text"
          data-testid="autocomplete-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              data-testid="suggestion-item"
              className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4"
              onClick={() => {
                setSearchTerm(suggestion.name);
                setShowSuggestions(false);
              }}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                {suggestion.image && (
                  <img
                    src={suggestion.image}
                    alt={suggestion.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                <div className="text-sm text-gray-500">{suggestion.specialty}</div>
              </div>
              <div className="ml-auto">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}