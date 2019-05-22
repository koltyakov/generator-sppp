export class Url {

  public static getRelativeUrl = (absoluteUrl: string): string => {
    if (absoluteUrl.toLowerCase().indexOf('http') !== 0) {
      return absoluteUrl;
    }
    return `/${absoluteUrl.split('/').slice(3).join('/')}`.replace(/\/\//g, '/');
  }

  public static getAbsoluteUrl = (relativeUrl: string): string => {
    const host = window.location.href.split('/').slice(0, 3).join('/');
    return `${host}${relativeUrl}`;
  }

  public static getUrlKeyValue = (key: string, url: string = window.location.search): string => {
    return Url.getUrlKeyPairs(url)[key];
  }

  public static getUrlKeyPairs = (url: string = window.location.search): { [key: string]: string; } => {
    return url.replace('?', '').split('&').reduce((res, keyPair) => {
      const [ key, value ] = keyPair.split('=');
      res[key] = decodeURIComponent(value);
      return res;
    }, {});
  }

}
