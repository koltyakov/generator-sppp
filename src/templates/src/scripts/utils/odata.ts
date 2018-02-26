import { sp } from '@pnp/sp';

// User 'application/json;odata=verbose' for compatibility with SP2013
export const ODataMode = 'application/json;odata=verbose';
// export const ODataMode = 'application/json;odata=minimalmetadata';

export const setupPnp = () => {
  sp.setup({
    sp: {
      headers: {
        Accept: ODataMode
      }
    }
  });
};
