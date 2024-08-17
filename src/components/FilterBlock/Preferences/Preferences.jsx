import React, { useState, useEffect } from 'react';
import { TagsInput } from 'react-tag-input-component';
import 'react-loading-skeleton/dist/skeleton.css';

import './Preferences.scss';
import { getLocallyStoredData, setLocallyStoredData } from '../../../utils/helpers';
import { PREFERRED_SOURCES, PREFERRED_CATEGORIES, PREFERRED_AUTHORS } from '../../../utils/constants';

const Preferences = () => {
  const [refreshPagePrompt, setRefreshPagePrompt] = useState(false);

  const [preferredSources, setPreferredSources] = useState([]);
  const [preferredCategories, setPreferredCategories] = useState([]);
  const [preferredAuthors, setPreferredAuthors] = useState([]);

  useEffect(() => {
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
      {refreshPagePrompt && <p className="input-prompt">Please refresh the page to see the customized news feed</p>}
      {(preferredSources.length > 0 || preferredCategories.length > 0 || preferredAuthors.length > 0) && (
        <button className="common-button" onClick={handleResetAllPreferences}>
          Reset Preferences
        </button>
      )}
    </div>
  );
};

export default Preferences;
