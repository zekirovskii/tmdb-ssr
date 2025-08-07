import { createContext, useContext, useState, useCallback } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Dropdown 
  const openDrop = useCallback(() => setShowDropdown(true), []);
  const closeDrop = useCallback(() => setShowDropdown(false), []);
  const toggleDrop = useCallback(() => setShowDropdown(prev => !prev), []);
  const forceOpenDropdown = useCallback(() => setShowDropdown(true), []);

  // Search Input 
  const showSearchInput = useCallback(() => setIsSearchVisible(true), []);
  const hideSearchInput = useCallback(() => setIsSearchVisible(false), []);
  const toggleSearchInput = useCallback(() => setIsSearchVisible(prev => !prev), []);

  return (
    <SearchContext.Provider
      value={{
        showDropdown,
        openDrop,
        closeDrop,
        toggleDrop,
        forceOpenDropdown,
        isSearchVisible,
        showSearchInput,
        hideSearchInput,
        toggleSearchInput,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
