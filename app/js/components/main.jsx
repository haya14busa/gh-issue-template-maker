var React = require('react');
var Hello = require('./Hello.jsx');

module.exports = function() {
  React.render(<Hello name='React' />, document.getElementById('react-app'));
};

