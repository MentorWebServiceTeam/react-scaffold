import {
  DECREMENT,
  INCREMENT,
  REQUEST_ASYNC
} from '../actions/ExampleActionCreators';

const initialState = {
  counter: 0,
  error: false,
  data: [],
  isFetching: false
};

export default function ExampleReducer(state = initialState, action = {}) {
  switch (action.type) {
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case REQUEST_ASYNC:
      return {
        ...initialState,
        isFetching: true
      };
    case `${REQUEST_ASYNC}_FAIL`:
      return {
        ...state,
        error: true,
        isFetching: false
      };
    case `${REQUEST_ASYNC}_SUCCESS`:
      return {
        ...state,
        data: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
}
