import React from 'react';
import { Alert } from 'antd';

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner: React.FC<Props> = ({
  message = 'Something went wrong',
  description = 'Look like something went wrong. Please check your connection and/or try again later.',
}) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};
