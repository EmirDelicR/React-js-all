import { useReducer, useCallback } from "react";
import { mockApiCall } from "../utils/helpers";

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, allData: null };
    case "RESPONSE":
      return { ...currentHttpState, loading: false, allData: action.data };
    case "ERROR":
      return { loading: false, error: action.message };
    case "CLEAR":
      return { ...currentHttpState, error: null };
    default:
      throw new Error("This should not be reached");
  }
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    allData: null
  });

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);
  /** Use callback (use just for functions) is just to prevent unnecessary rendering  */
  const sendRequest = useCallback(async () => {
    try {
      dispatchHttp({ type: "SEND" });
      const { isResolved, data } = await mockApiCall(true);
      dispatchHttp({ type: "RESPONSE", data: data });
      if (!isResolved) {
        return;
      }
    } catch (error) {
      dispatchHttp({ type: "ERROR", message: error.message });
      console.log(error.message);
    }
  }, []);

  return {
    isLoading: httpState.loading,
    allData: httpState.allData,
    error: httpState.error,
    sendRequest: sendRequest,
    clear: clear
  };
};

export default useHttp;
