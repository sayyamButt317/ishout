import {
  type ErrorResponse,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';

import ForbiddenError from './Forbidden';
import InternalError from './InternalError';
import MaintenanceError from './Maintenance';
import NotFoundError from './NotFound';

const ErrorBoundary = () => {
  const error = useRouteError();
  const errorStatus = (error as ErrorResponse).status;

  if (isRouteErrorResponse(error)) {
    if (errorStatus === 403) {
      return <ForbiddenError />;
    }

    if (errorStatus === 404) {
      return <NotFoundError />;
    }

    if (errorStatus === 503) {
      return <MaintenanceError />;
    }
  }

  if (error instanceof Error) {
    return <InternalError message={error.message} />;
  }

  return <InternalError />;
};

export default ErrorBoundary;
