import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IChildren } from "@/@types/baseInterface";

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: any }) {
  return (
    <div role="alert" className=" shadow-lg px-3 py-4 flex flex-col gap-3 items-start">
      <p className=" animate-bounce hover:animate-none text-error-100 font-semibold text-4xl">
        Opps!!! Something went wrong:
      </p>
      <pre className=" text-sm italic text-error-150">{error.message}</pre>
      <div className=" break-words">{JSON.stringify(error.stack)}</div>
      <button className=" bg-red-600 text-white py-4 rounded-2xl px-3" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

const myErrorHandler = (error: Error, info: React.ErrorInfo) => {
  // eslint-disable-next-line no-console
  console.log({ error, info: info.componentStack });
};

const AppErrorBoundary = ({ children }: IChildren) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
