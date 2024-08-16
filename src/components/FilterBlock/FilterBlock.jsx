import React, { useState, useEffect } from 'react';

import './FilterBlock.scss';

const FilterBlock = () => {
    const [filtOpened, setFiltOpened] = useState();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
      checkIsFiltersPreferenceSet();
    }, []);

    const checkIsFiltersPreferenceSet = () => {
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
    };

    const handleOpenFilterBlock = () => {
        try {
          localStorage.setItem('isFiltersOpened', 'true');
          setFiltOpened(true);
        } catch (e) {
          console.error(e);
        }
    }

    const handleCloseFilterBlock = () => {
        try {
          localStorage.setItem('isFiltersOpened', 'false');
          setFiltOpened(false);
        } catch (e) {
          console.error(e);
        }
    }
    
    return (
      <div className='filter-wrapper'>
        {filtOpened && 
        <div>
            <div className="input-container">
              <input
                autoComplete='off'
                placeholder='Search articles'
                type="text"
                name='search-articles'
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                // data-testid="base-input"
              />
              <p>* when input is empty the default search is applied (i.e. 'world news')</p>
            </div>
        </div>
        }
        {typeof filtOpened === 'boolean' && 
        <button className='filter-button' onClick={filtOpened ? () => handleCloseFilterBlock() : () => handleOpenFilterBlock()}>
            {filtOpened ? 'Hide filters' : 'Show filters'}
        </button>
        }
      </div>
  );
}

export default FilterBlock;
