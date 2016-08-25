import React from 'react';
import ResultsContainer from './DataTable';

export default ({children}) => {
  return (
    <div id="container" className="container">
      <h1>Journey Generator</h1>
      <div>
        <ResultsContainer />
      </div>
    </div>
  );
};
