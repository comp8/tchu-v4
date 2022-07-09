import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import App from './AppDemo';

const root = createRoot(
  document.getElementById('app')
);

root.render(
  React.createElement(App)
);