import { initializeIcons } from '@uifabric/icons';
import { getAssetsPath } from '@utils/assets';

export const loadFonts = () => {
  initializeIcons(`${getAssetsPath()}/fonts/`);
};
