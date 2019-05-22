import * as React from 'react';

import { Url } from '@utils/url';
import { logger } from '@utils/logger';

import { IProps } from './IErrorMessage';

import './ErrorMessage.scss';

export const ErrorMessage = (props: IProps) => {
  logger.log(props.message);
  let error: any = props.message;
  if (Url.getUrlKeyValue('debug') !== 'true') {
    if (error.message) {
      error = error.message;
    }
    const errs = error.split(' ::> '); // PnPjs OData errors parser
    if (errs.length === 2) {
      try {
        error = `${errs[0]}. ${JSON.parse(errs[1])['odata.error'].message.value}.`;
      } catch (ex) { /**/ }
    }
  }
  return <div className='error-message'>{error}</div>;
};
