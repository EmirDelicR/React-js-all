import React, { Component, Fragment } from "react";

import Modal from "../../components/UI/Modal/Modal";
import { HTTP } from "../../plugins/axios";

const withErrorhandler = WrappedComponent => {
  return class extends Component {
    state = {
      error: null,
      errorMsg: ""
    };

    constructor() {
      super();
      this.reqInterceptor = HTTP.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = HTTP.interceptors.response.use(
        res => res,
        error => {
          const message = `Request to [${error.config.url}] with method [${error.config.method}] failed with response [${error.message}]`;
          this.setState({ error: error, errorMsg: message });
        }
      );
    }

    /** This prevents memory leaks */
    componentWillUnmount() {
      HTTP.interceptors.request.eject(this.reqInterceptor);
      HTTP.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedError}>
            {this.state.error ? this.state.errorMsg : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorhandler;
