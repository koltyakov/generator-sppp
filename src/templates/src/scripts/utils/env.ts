import { loadPageContext } from 'sp-rest-proxy/dist/utils/env';
import { IAppConfig } from 'sp-build-tasks';

declare const APP_CONFIG: IAppConfig;

export const loadContext = async (): Promise<void> => {
  await loadPageContext();
  await executeOrDelayUntilBodyLoaded();
};

const executeOrDelayUntilBodyLoaded = (): Promise<void> => {
  return new Promise(resolve => {
    // tslint:disable-next-line: strict-type-predicates
    if (typeof ExecuteOrDelayUntilBodyLoaded === 'function') {
      ExecuteOrDelayUntilBodyLoaded(resolve);
    } else {
      resolve();
    }
  });
};

export const appConfig = APP_CONFIG;
