import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { decrement, increment, getAsyncData } from '../actions/ExampleActionCreators';

@connect(state => ({
  example: state.example
}))
class App extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    example: PropTypes.shape({
      counter: PropTypes.number.isRequired,
      data: PropTypes.array.isRequired,
      error: PropTypes.bool,
      isLoading: PropTypes.bool.isRequired
    }).isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAsyncData());
  }

  render() {
    const { example, dispatch } = this.props;
    const { counter, data, error, isFetching } = example;

    return (
      <DocumentTitle title={`Count - ${counter}`}>
        <div>
          <h2>Counter: {counter}</h2>
          <div className="btn-group">
            <button className="btn btn-default btn-lg" onClick={() => dispatch(decrement())}>
              -
            </button>
            <button className="btn btn-default btn-lg" onClick={() => dispatch(increment())}>
              +
            </button>
          </div>
          <h3>Async Request</h3>
          {isFetching && <span>Loading...</span>}
          {(!isFetching && !error) && <div>
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>}
        </div>
      </DocumentTitle>
    );
  }
}

export default App;
