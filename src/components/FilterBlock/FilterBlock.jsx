import React, { useState, useEffect, useCallback } from 'react';

import './FilterBlock.scss';
import Search from './Search/Search';
import Filters from './Filters/Filters';
import Preferences from './Preferences/Preferences';

const FilterBlock = () => {
  const [filtOpened, setFiltOpened] = useState();

  useEffect(() => {
    checkIsFiltersPreferenceSet();
  }, []);

  const checkIsFiltersPreferenceSet = useCallback(() => {
    try {
      const isFiltersOpenedSet = localStorage.getItem('isFiltersOpened');
      if (isFiltersOpenedSet) {
        const isFiltersOpened = isFiltersOpenedSet === 'true' ? true : false;
        setFiltOpened(isFiltersOpened);
        return;
      }
      localStorage.setItem('isFiltersOpened', 'false');
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleFilterBlock = useCallback(() => {
    try {
      setFiltOpened((prevState) => {
        if (prevState) {
          localStorage.setItem('isFiltersOpened', 'false');
          return false;
        }
        if (!prevState) {
          localStorage.setItem('isFiltersOpened', 'true');
          return true;
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className={`filter-wrapper ${filtOpened ? 'filter-wrapper__opened' : ''}`}>
      {filtOpened && (
        <div className="filters-container">
          <Search />
          <Filters />
          <Preferences />
        </div>
      )}
      {typeof filtOpened === 'boolean' && (
        <button className="common-button" onClick={handleToggleFilterBlock}>
          {filtOpened ? 'Hide filters' : 'Show filters'}
        </button>
      )}
    </div>
  );
};

export default FilterBlock;
