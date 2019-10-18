import { initializeIcons } from '@uifabric/icons';
import { setIconOptions } from 'office-ui-fabric-react';
import { getAssetsPath } from '@utils/assets';

setIconOptions({ disableWarnings: true });

export const loadFonts = () => {
  if (!(window as any).uiFabricFontsLoaded) {
    (window as any).uiFabricFontsLoaded = true;
    initializeIcons(`${getAssetsPath()}/fonts/`);
  }
};
