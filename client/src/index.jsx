/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const HotRoot = require('./Root').default;
    ReactDOM.render(
      <HotRoot />,
      document.getElementById('root')
    );
  });
}
