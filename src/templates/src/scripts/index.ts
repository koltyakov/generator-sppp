import { sp } from '@pnp/sp';
import { setupPnp } from './utils/odata';
import { loadContext } from './utils/env';

loadContext().then(_ => {

  setupPnp();

  const container = document.getElementById('example-cewp-container');

  if (container) {

    Promise.all([
      sp.web.select('Title').get(),
      sp.web.lists.select('Title').get()
    ])
      .then(([web, lists]) => {
        container.innerHTML =
          `<h2>Web title: ${web.Title}</h2>` +
          `<ul>
            ${lists.map(list => `<li>${list.Title}</li>`).join('')}
          </ul>`;
      })
      .catch(error => {
        container.innerHTML = `
          <div style="color: red;">
            ${error.message}
          </div>
        `;
      });

  }

}).catch(console.warn);