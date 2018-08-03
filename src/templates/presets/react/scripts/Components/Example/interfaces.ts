export interface IProps {}

export interface IState {
  isLoading: boolean;
  title?: string;
  lists?: IList[];
}

export interface IList {
  id: string;
  title: string;
}
