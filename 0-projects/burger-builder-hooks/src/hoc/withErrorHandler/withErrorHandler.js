import React, { Fragment } from "react";

import Modal from "../../components/UI/Modal/Modal";
import { HTTP } from "../../plugins/axios";
import { useHttpErrorHandler } from "../../hooks/http-error-handler";

const withErrorhandler = WrappedComponent => {
  return props => {
    const [error, errorMsg, errorConfirmedError] = useHttpErrorHandler(HTTP);

    return (
      <Fragment>
        <Modal show={error} modalClosed={errorConfirmedError}>
          {error ? errorMsg : null}
        </Modal>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

export default withErrorhandler;
