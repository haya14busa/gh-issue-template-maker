(function() {
  'use strict';

  var React = require('react');
  var Hello = require('./components/Hello.jsx');

  // React.render(<Hello name='React' />, document.getElementById('react-app'));
  React.render(
    React.createFactory(Hello)({name: 'React'}), document.getElementById('react-app')
  );
})();
