var React = require('react');

// props: immutable <- preferable
// state: mutable

var Hello = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  getInitialState() {
    return {
      count: 0
    };
  },
  onClick() {
    this.setState({count: this.state.count + 1});
  },
  reset() {
    this.setState({count: 0});
  },
  render() {
    return (
      <div className='container'>
        <div>Hi, {this.props.name}</div>
        <div>count: {this.state.count}</div>
        <button onClick={this.onClick}>click!</button>
        <button onClick={this.reset}>reset!</button>
      </div>
    );
  }
});

module.exports = Hello;
