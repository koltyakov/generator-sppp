import * as React from 'react';

import { ErrorMessage } from '@components/ErrorMessage';
import { Loading } from '@components/Loading';

import Api from './operations';
import { IProps, IState } from './IExample';

export class Example extends React.Component<IProps, IState> {

  private api: Api;

  constructor(props: IProps) {
    super(props);
    this.api = new Api();
    this.state = { isLoading: true };
  }

  public render() {
    const lists = this.state.lists ? this.state.lists : [];
    return (
      <>
        {this.state.isLoading && <Loading />}
        {!this.state.isLoading && this.state.error && <ErrorMessage message={this.state.error} />}
        {!this.state.isLoading && !this.state.error && (
          <>
            <h2>Web title: {this.state.title}</h2>
            <ul>
              {lists.map((list) => <li key={list.id}>{list.title}</li>)}
            </ul>
          </>
        )}
      </>
    );
  }

  public componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([
      this.api.getWebTitle(),
      this.api.getLists()
    ])
      .then(([title, lists]) => {
        this.setState({
          isLoading: false,
          title,
          lists
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error: error.message
        });
      });
  }

}
