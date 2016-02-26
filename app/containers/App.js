import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { decrement, increment } from '../actions/ExampleActionCreators';

@connect(state => ({
  count: state.example.counter
}), { decrement, increment })
class App extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render() {
    const { count, decrement, increment } = this.props;
    
    return (
      <DocumentTitle title={`Count - ${count}`}>
        <div>
          <h2>Counter: {count}</h2>
          <div className="btn-group">
            <button className="btn btn-default btn-lg" onClick={() => decrement()}>-</button>
            <button className="btn btn-default btn-lg" onClick={() => increment()}>+</button>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default App;
