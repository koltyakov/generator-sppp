import * as React from 'react';

import { IProps } from './ILoading';

import './Loading.scss';

export const Loading = (props: IProps) => {
  return (
    <div style={props.style} >
      Loading...
    </div>
  );
};
