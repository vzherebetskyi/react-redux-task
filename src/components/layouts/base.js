import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pass the child props
export default function Layout({ children }) {
  return (
    <div>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        style={{ width: 'auto', maxWidth: '700px', zIndex: 99999999 }}
        draggable
        pauseOnHover
        theme="colored"
        limit={10}
      />
    </div>
  );
}
