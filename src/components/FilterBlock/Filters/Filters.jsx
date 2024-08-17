import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MultiSelect } from 'react-multi-select-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './Filters.scss';
import { filterArticles } from '../../../redux/actions/articlesActions';
import { getFilteredArticles } from '../../../utils/helpers';

const Filters = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const filters = useSelector((state) => state.filtersReducer.filters);

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);

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

  return (
    <>
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
    </>
  );
};

export default Filters;
