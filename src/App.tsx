import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    <GlobalStyles />
  </>
);

export default App;
