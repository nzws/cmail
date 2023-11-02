import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

import { ErrorMessage } from "../error";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <ErrorMessage
      message={
        isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error instanceof Error
          ? `Error: ${error.message}`
          : "Unknown Error"
      }
    />
  );
}
