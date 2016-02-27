import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { decrement, increment, getAsyncData } from '../actions/ExampleActionCreators';

@connect(state => ({
  example: state.example
}), { decrement, increment, getAsyncData })
class App extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getAsyncData } = this.props;
    getAsyncData();
  }

  render() {
    const { example, decrement, increment } = this.props;
    const { counter, data, error, isFetching } = example;

    return (
      <DocumentTitle title={`Count - ${counter}`}>
        <div>
          <h2>Counter: {counter}</h2>
          <div className="btn-group">
            <button className="btn btn-default btn-lg" onClick={() => decrement()}>-</button>
            <button className="btn btn-default btn-lg" onClick={() => increment()}>+</button>
          </div>
          <h3>Async Request</h3>
          {isFetching && <span>Loading...</span>}
          {(!isFetching && !error) && <div>
            <ul>
              {data.map((item, index) => {
                return (
                  <li key={index}>{item}</li>
                );
              })}
            </ul>
          </div>}
        </div>
      </DocumentTitle>
    );
  }
}

export default App;
