const ErrorMessage = ({ message }: { message?: string }) => (
  <span className={`text-red-500 ${message ? 'visible' : 'invisible'} h-6`}>
    {message}
  </span>
);

export default ErrorMessage;