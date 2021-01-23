import * as React from 'react';

import { Spinner, SpinnerSize } from '@fluentui/react';

import { IProps } from './ILoading';

import './Loading.scss';

export const Loading = (props: IProps) => {
  return (
    <div
      style={props.style}
    >
      <Spinner
        className='loading-animation'
        size={SpinnerSize.large}
        id={props.id}
      />
      <div className='clear-both' />
    </div>
  );
};
