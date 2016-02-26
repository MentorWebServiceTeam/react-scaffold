import expect from 'expect';

import {
  DECREMENT,
  INCREMENT,
  decrement,
  increment
} from '../../app/actions/ExampleActionCreators';

describe('ExampleActionCreators', () => {
  it('should create the following actions', () => {
    expect(decrement()).toEqual({ type: DECREMENT });
    expect(increment()).toEqual({ type: INCREMENT });
  });
});
