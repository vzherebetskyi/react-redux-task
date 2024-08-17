import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import { TagsInput } from 'react-tag-input-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import _ from 'lodash';

import './FilterBlock.scss';
import { updateSearch } from '../../redux/actions/filtersActions';
import { filterArticles } from '../../redux/actions/articlesActions';
import { getFilteredArticles, getLocallyStoredData, setLocallyStoredData } from '../../utils/helpers';
import { PREFERRED_SOURCES, PREFERRED_CATEGORIES, PREFERRED_AUTHORS } from '../../utils/constants';

const FilterBlock = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const filters = useSelector((state) => state.filtersReducer.filters);
  const [filtOpened, setFiltOpened] = useState();
  const [refreshPagePrompt, setRefreshPagePrompt] = useState(false);

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

  const [preferredSources, setPreferredSources] = useState([]);
  const [preferredCategories, setPreferredCategories] = useState([]);
  const [preferredAuthors, setPreferredAuthors] = useState([]);

  const stringifiedDates = JSON.stringify(selectedDates);
  const stringifiedCategories = JSON.stringify(selectedCategories);
  const stringifiedSources = JSON.stringify(selectedSources);
  const stringifiedFilters = JSON.stringify(filters);

  const filteredArticles = useMemo(
    () => getFilteredArticles(articles, selectedDates, selectedCategories, selectedSources),
    [stringifiedDates, stringifiedCategories, stringifiedSources],
  );
  const stringifiedFilteredArticles = JSON.stringify(filteredArticles);

  useEffect(() => {
    checkIsFiltersPreferenceSet();

    const locallyStoredPreferredSources = getLocallyStoredData(PREFERRED_SOURCES);
    if (locallyStoredPreferredSources) {
      setPreferredSources([...locallyStoredPreferredSources]);
    }

    const locallyStoredPreferredCategories = getLocallyStoredData(PREFERRED_CATEGORIES);
    if (locallyStoredPreferredCategories) {
      setPreferredCategories([...locallyStoredPreferredCategories]);
    }

    const locallyStoredPreferredAuthors = getLocallyStoredData(PREFERRED_AUTHORS);
    if (locallyStoredPreferredAuthors) {
      setPreferredAuthors([...locallyStoredPreferredAuthors]);
    }
  }, []);

  useEffect(() => {
    if (filters.date) {
      setSelectedDates([...filters.date.map((dat) => ({ label: dat, value: dat }))]);
    }
    if (filters.category) {
      setSelectedCategories([...filters.category.map((cat) => ({ label: cat, value: cat }))]);
    }
    if (filters.source) {
      setSelectedSources([...filters.source.map((sour) => ({ label: sour, value: sour }))]);
    }
  }, [stringifiedFilters]);

  useEffect(() => {
    dispatch(filterArticles(filteredArticles));
  }, [stringifiedFilteredArticles]);

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

  const handleSearchArticles = useCallback(
    _.throttle((e) => {
      dispatch(updateSearch(e.target.value));
    }, 1500),
    [],
  );

  const handleUpdateSources = (tags) => {
    const locallyStoredPreferredSources = getLocallyStoredData(PREFERRED_SOURCES);
    if (JSON.stringify(tags) !== JSON.stringify(locallyStoredPreferredSources)) {
      setLocallyStoredData(PREFERRED_SOURCES, tags);
      setPreferredSources(tags);
      setRefreshPagePrompt(true);
    }
  };

  const handleUpdateCategories = (tags) => {
    const locallyStoredPreferredCategories = getLocallyStoredData(PREFERRED_CATEGORIES);
    if (JSON.stringify(tags) !== JSON.stringify(locallyStoredPreferredCategories)) {
      setLocallyStoredData(PREFERRED_CATEGORIES, tags);
      setPreferredCategories(tags);
      setRefreshPagePrompt(true);
    }
  };

  const handleUpdateAuthors = (tags) => {
    const locallyStoredPreferredAuthors = getLocallyStoredData(PREFERRED_AUTHORS);
    if (JSON.stringify(tags) !== JSON.stringify(locallyStoredPreferredAuthors)) {
      setLocallyStoredData(PREFERRED_AUTHORS, tags);
      setPreferredAuthors(tags);
      setRefreshPagePrompt(true);
    }
  };

  const handleResetAllPreferences = () => {
    setLocallyStoredData(PREFERRED_SOURCES, []);
    setPreferredSources([]);
    setLocallyStoredData(PREFERRED_CATEGORIES, []);
    setPreferredCategories([]);
    setLocallyStoredData(PREFERRED_AUTHORS, []);
    setPreferredAuthors([]);
    setRefreshPagePrompt(true);
  };

  return (
    <div className={`filter-wrapper ${filtOpened ? 'filter-wrapper__opened' : ''}`}>
      {filtOpened && (
        <div className="filters-container">
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
              // data-testid="base-input"
            />
            <p className="input-prompt">* when input is empty the default search is applied (i.e. 'world news')</p>
          </div>
          {JSON.stringify(filters) !== '{}' ? (
            <div>
              <p className="section-name">Filters:</p>
              <div className="filters-block">
                <div>
                  <p>Date</p>
                  <MultiSelect
                    className="filter-select"
                    options={filters.date?.map((date) => ({ label: date, value: date }))}
                    value={selectedDates}
                    onChange={setSelectedDates}
                    labelledBy="Select date"
                  />
                </div>
                <div>
                  <p>Category</p>
                  <MultiSelect
                    className="filter-select"
                    options={filters.category.map((cat) => ({ label: cat, value: cat }))}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    labelledBy="Select category"
                  />
                </div>
                <div>
                  <p>Source</p>
                  <MultiSelect
                    className="filter-select"
                    options={filters.source.map((sour) => ({ label: sour, value: sour }))}
                    value={selectedSources}
                    onChange={setSelectedSources}
                    labelledBy="Select source"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="filters-block">
              <p>
                <strong>Filters:</strong>
              </p>
              <Skeleton height={27} width={150} />
            </div>
          )}
          <div>
            <p className="section-name">Preferences:</p>
            <div className="filters-block">
              <div>
                <p>Sources</p>
                <TagsInput
                  value={preferredSources}
                  onChange={(tags) => handleUpdateSources(tags)}
                  name={PREFERRED_SOURCES}
                  placeHolder="Enter preferred sources"
                />
                <p className="input-prompt">* press enter to add a new tag</p>
              </div>
              <div>
                <p>Categories</p>
                <TagsInput
                  value={preferredCategories}
                  onChange={(tags) => handleUpdateCategories(tags)}
                  name={PREFERRED_CATEGORIES}
                  placeHolder="Enter preferred categories"
                />
                <p className="input-prompt">* press enter to add a new tag</p>
              </div>
              <div>
                <p>Authors</p>
                <TagsInput
                  value={preferredAuthors}
                  onChange={(tags) => handleUpdateAuthors(tags)}
                  name={PREFERRED_AUTHORS}
                  placeHolder="Enter preferred authors"
                />
                <p className="input-prompt">* press enter to add a new tag</p>
              </div>
            </div>
            {refreshPagePrompt && (
              <p className="input-prompt">Please refresh the page to see the customized news feed</p>
            )}
            {(preferredSources.length > 0 || preferredCategories.length > 0 || preferredAuthors.length > 0) && (
              <button className="common-button" onClick={handleResetAllPreferences}>
                Reset Preferences
              </button>
            )}
          </div>
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
