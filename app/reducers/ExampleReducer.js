import {
  DECREMENT,
  INCREMENT
} from '../actions/ExampleActionCreators';

const initialState = {
  counter: 0
};

export default function ExampleReducer(state = initialState, action = {}) {
  switch (action.type) {
    case DECREMENT:
      return {
        counter: state.counter - 1
      };
    case INCREMENT:
      return {
        counter: state.counter + 1
      };
    default:
      return state;
  }
}
