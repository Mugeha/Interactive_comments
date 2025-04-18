import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CommentsProvider } from './Context/CommentsContext';
import './index.css'; // or App.css if you're using that

// 1. Wrap the app in the CommentsProvider so it can access global state
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CommentsProvider>
      <App />
    </CommentsProvider>
  </React.StrictMode>
);
