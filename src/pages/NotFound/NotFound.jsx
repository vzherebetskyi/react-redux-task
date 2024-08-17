import React from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../../components/layouts/base';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="page-wrapper">
        <p className="page-title">Page not found</p>
        <button className="back-btn" onClick={() => navigate('/')}>
          Go back to the articles list
        </button>
      </div>
    </Layout>
  );
};

export default NotFound;
