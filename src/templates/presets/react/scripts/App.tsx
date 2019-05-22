import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { loadContext } from '@utils/env';
import { logger } from '@utils/logger';
import { setupPnp } from '@utils/odata';

import { Example } from '@components/Example';

loadContext().then(() => {

  setupPnp();

  const el = document.getElementById('example-cewp-container');
  ReactDOM.render(<Example />, el);

}).catch(logger.error);
