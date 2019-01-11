import * as React from 'react';

import Api from './operations';
import { IProps, IState } from './interfaces';

export default class Example extends React.Component<IProps, IState> {

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
        {this.state.isLoading && (
          <div>Loading...</div>
        )}
        {!this.state.isLoading && !this.state.error && (
          <>
            <h2>Web title: {this.state.title}</h2>
            <ul>
              {lists.map(list => {
                return <li key={list.id}>{list.title}</li>;
              })}
            </ul>
          </>
        )}
        {!this.state.isLoading && this.state.error && (
          <div style={{ color: 'red' }}>{this.state.error}</div>
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
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error.message
        });
      });
  }

}
