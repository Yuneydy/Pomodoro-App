import React from 'react';
import ReactDOM from 'react-dom/client';
import Timer from './components/Timer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
    </style>
    <Timer />
  </React.StrictMode>
);