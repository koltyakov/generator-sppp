// tslint:disable-next-line: no-submodule-imports
import { loadPageContext } from 'sp-rest-proxy/dist/utils/env';
import { IAppConfig } from 'sp-build-tasks';
import { getAssetsPath } from './assets';

declare const APP_CONFIG: IAppConfig;
declare let __webpack_public_path__: string;

export const appConfig = APP_CONFIG;

export const loadContext = async (): Promise<void> => {
  await loadPageContext();
  await executeOrDelayUntilBodyLoaded();
  __webpack_public_path__ = `${getAssetsPath()}/scripts/`;
};

export const patchWorkbench = () => {
  if (window.location.hostname === 'localhost') {
    const d = document.querySelector('html');
    if (d) {
      d.classList.add('workbench');
    }
  }
};

const executeOrDelayUntilBodyLoaded = (): Promise<void> => {
  return new Promise((resolve) => {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof ExecuteOrDelayUntilBodyLoaded === 'function') {
      ExecuteOrDelayUntilBodyLoaded(resolve);
    } else {
      resolve();
    }
  });
};
