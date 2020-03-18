import * as actionTypes from "./types";
import { makeApiRequest, isResponseSuccess } from "../../../utils/api/api";
import { API_REQUEST_TYPES, API_REQUEST_URLS } from "../../../utils/constants";

// This are sync function
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

// this is async function
export const purchaseBurger = (orderData, token) => {
  return async dispatch => {
    dispatch(purchaseBurgerStart());

    const response = await makeApiRequest(
      `${API_REQUEST_URLS.orders}?auth=${token}`,
      API_REQUEST_TYPES.post,
      orderData,
      token
    );

    if (!isResponseSuccess(response)) {
      console.error("Error: ", response);
      dispatch(purchaseBurgerFail(response.error));
      return;
    }

    dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  };
};

// This are sync function
export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

// this is async function
export const fetchOrders = (token, userId) => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="${userId}"&equalTo="${userId}"`;

    const response = await makeApiRequest(
      `${API_REQUEST_URLS.orders}${queryParams}`,
      API_REQUEST_TYPES.get
    );

    if (!isResponseSuccess(response)) {
      console.error("Error: ", response);
      dispatch(fetchOrdersFail(response.error));
      return;
    }

    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key
      });
    }
    dispatch(fetchOrdersSuccess(fetchedOrders));
  };
};
