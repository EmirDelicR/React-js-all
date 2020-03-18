import { useState, useEffect } from "react";

export const useHttpErrorHandler = client => {
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const reqInterceptor = client.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = client.interceptors.response.use(
    res => res,
    err => {
      const message = `Request to [${err.config.url}] with method [${err.config.method}] failed with response [${err.message}]`;
      setError(err);
      setErrorMsg(message);
    }
  );

  /** This prevents memory leaks */
  useEffect(() => {
    return () => {
      client.interceptors.request.eject(reqInterceptor);
      client.interceptors.response.eject(resInterceptor);
    };
  }, [
    client.interceptors.request,
    client.interceptors.response,
    reqInterceptor,
    resInterceptor
  ]);

  const errorConfirmedError = () => {
    setError(null);
  };

  return [error, errorMsg, errorConfirmedError];
};
