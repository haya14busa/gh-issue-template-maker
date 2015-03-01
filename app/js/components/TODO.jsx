var React = require('react');
// var React = require('react/addons');

var Todo = React.createClass({
  propTypes: {
    todo: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired
    }),
    onDelete: React.PropTypes.func.isRequired
  },
  _onDelete() {
    this.props.onDelete(this.props.todo.id);
  },
  render() {
    return (
      <div>
        <span>{this.props.todo.text}</span>
        <button onClick={this._onDelete}>delete!</button>
      </div>
    );
  }
});

var TodoList = React.createClass({
  getInitialState() {
    return {
      todos: [
        {id: 1, text: 'ichi'},
        {id: 2, text: 'ni'},
        {id: 3, text: 'san'},
        {id: 4, text: 'yon'},
      ],
      text: ''
    };
  },
  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => {
        return todo.id !== id;
      })
    });
  },
  addTodo(e) {
    e.preventDefault();
    if (this.state.text === '') return;
    var nextId = this.state.todos
      .map((todo) => { return todo.id; })
      .reduce((i, id) => { return i + id; }, 0);
    var nextTodo = {
      id: nextId,
      text: this.state.text
    };
    this.setState({
      todos: this.state.todos.concat([nextTodo]),
      text: ''
    });
  },
  onChange(e) {
    this.setState({
      text: e.target.value
    });
  },
  render() {
    var todos = this.state.todos.map((todo) => {
      return (
        <li key={todo.id}>
          <Todo todo={todo} onDelete={this.deleteTodo} />
        </li>
      );
    });
    return (
      <div>
        <ul>{todos}</ul>
        <form onSubmit={this.addTodo}>
          <input type='text' onChange={this.onChange} value={this.state.text} />
          <button>Add</button>
        </form>
      </div>
    );
  }
});

module.exports = TodoList;
