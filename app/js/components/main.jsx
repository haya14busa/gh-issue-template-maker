var React = require('react');
var Hello = require('./Hello.jsx');
var TodoList = require('./TODO.jsx');

module.exports = function() {
  var hello = React.render(<Hello name='React' />, document.getElementById('react-app'));
  hello.setProps({name: 'react x react', additional: 10});

  React.render(<TodoList />, document.getElementById('react-todo'));
};

