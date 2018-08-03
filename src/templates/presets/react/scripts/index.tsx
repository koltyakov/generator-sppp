import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { setupPnp } from './utils/odata';
import Example from './Components/Example';

ExecuteOrDelayUntilBodyLoaded(() => {

  setupPnp();

  const el = document.getElementById('example-cewp-container');
  ReactDOM.render(<Example />, el);

});
