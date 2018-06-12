import React from 'react';
import Main from './components/Main';
import Search from './components/Search';

const App = () => (
  <div id="parent">
  <div id="search">
    <h1>Photo Search</h1>
    <Search />
  </div>
  <div id="upload">
    <h1>Photo Upload</h1>
    <Main />
  </div>
  </div>
);

export default App;
