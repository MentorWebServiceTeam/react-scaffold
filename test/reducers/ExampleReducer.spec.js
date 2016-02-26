import expect from 'expect';

import {
  DECREMENT,
  INCREMENT
} from '../../app/actions/ExampleActionCreators';
import reducer from '../../app/reducers/ExampleReducer';

describe('ExampleReducer', () => {
  it('should return the initialState', () => {
    expect(reducer()).toEqual({ counter: 0 });
  });

  it('should increment the counter by 1', () => {
    expect(reducer(
      { counter: 1 },
      { type: INCREMENT }
    )).toEqual({ counter: 2 });
  });

  it('should decrement the counter by 1', () => {
    expect(reducer(
      { counter: 1 },
      { type: DECREMENT }
    )).toEqual({ counter: 0 });
  });
});
