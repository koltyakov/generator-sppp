export interface IProps {}

export interface ILoadable {
  isLoading: boolean;
  error?: string;
}

export interface IState extends ILoadable {
  title?: string;
  lists?: IList[];
}

export interface IList {
  id: string;
  title: string;
}
