import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import './Search.scss';
import { updateSearch } from '../../../redux/actions/filtersActions';

const Search = () => {
  const dispatch = useDispatch();

  const handleSearchArticles = useCallback(
    _.throttle((e) => {
      dispatch(updateSearch(e.target.value));
    }, 1500),
    [],
  );

  return (
    <div className="input-container">
      <p>
        <strong>Search</strong>
      </p>
      <input
        autoComplete="off"
        placeholder="Search articles"
        type="text"
        name="search-articles"
        onChange={handleSearchArticles}
      />
      <p className="input-prompt">* when input is empty the default search is applied (i.e. 'world news')</p>
    </div>
  );
};

export default Search;
