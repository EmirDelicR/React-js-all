import { authReducer } from "./auth.reducers";
import * as actionTypes from "../../actions/auth/types";

describe("auth reducer", () => {
  let state;

  beforeEach(() => {
    state = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    };
  });

  it("should return initial state", () => {
    expect(authReducer(undefined, {})).toEqual(state);
  });

  it("should store token upon login", () => {
    expect(
      authReducer(state, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "token",
        userId: "id"
      })
    ).toEqual({
      token: "token",
      userId: "id",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
