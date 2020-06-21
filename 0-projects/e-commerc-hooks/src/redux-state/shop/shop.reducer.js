// import { SHOP_DATA } from '../../utility/constants';
import { SHOP_ACTION_TYPES } from './shop.types';

// const INITIAL_STATE = SHOP_DATA;
const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOP_ACTION_TYPES.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case SHOP_ACTION_TYPES.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: action.payload,
        isFetching: false,
      };
    case SHOP_ACTION_TYPES.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
