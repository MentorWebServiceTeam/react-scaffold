import axios from 'axios';

export const DECREMENT = 'DECREMENT';
export const INCREMENT = 'INCREMENT';
export const REQUEST_ASYNC = 'REQUEST_ASYNC';

export function decrement() {
  return {
    type: DECREMENT
  };
}

export function increment() {
  return {
    type: INCREMENT
  };
}

export function getAsyncData() {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST_ASYNC });
    return axios.get('/api/v1/test')
      .then(res => res.data)
      .then(data => dispatch({
        type: `${REQUEST_ASYNC}_SUCCESS`,
        payload: data
      }))
      .catch(error => dispatch({
        type: `${REQUEST_ASYNC}_FAIL`,
        error
      }));
  };
}
