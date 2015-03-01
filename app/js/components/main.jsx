var React = require('react');
var Router = require('react-router');

var Hello = require('./Hello.jsx');
var TodoList = require('./TODO.jsx');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render() {
    return (
      <div>
        <header>
          <ul>
            <li><Link to='dashboard'>Dashboard</Link></li>
            <li><Link to='hello'>Hello</Link></li>
            <li><Link to='todo'>TODO</Link></li>
          </ul>
        </header>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

var Dashboard = React.createClass({
  render() {
    return (
      <ul>
        <li><Link to='hello'>Hello</Link></li>
        <li><Link to='todo'>TODO</Link></li>
      </ul>
    );
  }
});

var routes = (
  <Route name='dashboard' path='/' handler={App}>
    <Route name='hello' handler={Hello}/>
    <Route name='todo' handler={TodoList}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

module.exports = function() {
  Router.run(routes, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params}/>, document.getElementById('react-app'));
  });
};

