import React from 'react';

const ErrorMessage: React.FC<{ message?: string }> = React.memo(({ message }) => (
  <span className={`text-red-500 ${message ? 'visible' : 'invisible'} h-6`}>
    {message}
  </span>
));

export default ErrorMessage;
