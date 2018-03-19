import { sp } from '@pnp/sp';
import { setupPnp } from './utils/odata';

setupPnp();

const container: HTMLElement = document.getElementById('example-cewp-container');

Promise.all([
  sp.web.select('Title').get(),
  sp.web.lists.select('Title').get()
]).then(([web, lists]) => {
  container.innerHTML =
    `<h2>Web title: ${web.Title}</h2>` +
    `<ul>
      ${lists.map(list => `<li>${list.Title}</li>`).join('')}
    </ul>`;
});
