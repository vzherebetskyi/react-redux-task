import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App.js';
import Counter from './pages/Counter';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/counter" element={<Counter />} />
        </Routes> 
      
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
