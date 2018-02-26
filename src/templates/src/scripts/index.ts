import { sp } from '@pnp/sp';
import { setupPnp } from './utils/odata';

setupPnp();

sp.web.select('Title').get().then(web => {
  console.log(`Web: '${web.Title}'`);
});
