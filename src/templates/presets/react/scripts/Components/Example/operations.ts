import { Web } from '@pnp/sp';

import { IList } from './interfaces';

export default class Service {

  private web: Web;

  constructor(webAbsoluteUrl: string = _spPageContextInfo.webAbsoluteUrl) {
    this.web = new Web(webAbsoluteUrl);
  }

  public getWebTitle(): Promise<string> {
    return this.web.select('Title').get().then(({ Title }) => Title);
  }

  public getLists(): Promise<IList[]> {
    return this.web.lists.select('Id,Title').get()
      .then(lists => {
        return lists.map(({ Id, Title }) => {
          return {
            id: Id,
            title: Title
          };
        });
      });
  }

}
