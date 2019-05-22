import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { setupPnp } from './utils/odata';
import { loadContext } from './utils/env';

import Example from './Components/Example';

loadContext().then(_ => {

  setupPnp();

  const el = document.getElementById('example-cewp-container');
  ReactDOM.render(<Example />, el);

}).catch(console.warn);
