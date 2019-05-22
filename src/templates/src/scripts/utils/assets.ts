import { appConfig } from './env';

declare let _publish_web_url_: string;
declare let SPPP_ASSETS_LOCATION: 'SPWeb' | 'SPSite';

export const getAssetsPath = (): string => {
  let publishWebUrl: string = _spPageContextInfo.siteServerRelativeUrl;
  if (SPPP_ASSETS_LOCATION && SPPP_ASSETS_LOCATION === 'SPWeb') {
    publishWebUrl = _spPageContextInfo.webServerRelativeUrl;
  }
  // tslint:disable-next-line: strict-type-predicates
  if (typeof _publish_web_url_ !== 'undefined') {
    publishWebUrl = _publish_web_url_;
  }
  const publishPath = `${publishWebUrl}/${appConfig.spFolder}`
    .replace('://', '___')
    .replace(/\/\//g, '/')
    .replace('___', '://');
  return publishPath;
};
