// GHITemplate
// GitHub Issues Template
var React = require('react/addons');
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var LinkedStateMixin = React.addons.LinkedStateMixin
var PureRenderMixin = React.addons.PureRenderMixin;

var style = {
  titleContainer: {
    marginBottom: 10,
  },
  titleBox: {
    padding: '6px 10px'
  },
  textarea: {
    minHeight: 200,
    width: 400,
    padding: 10
  }
};

var Textarea = React.createClass({
  mixins: [PureRenderMixin, LinkedStateMixin],
  getInitialState() {
    return {
      title: '',
      body: ''
    };
  },
  render() {
    return (
      <div>
        <div> {/* input */}
          <div style={style.titleContainer}>
            <input type='text' valueLink={this.linkState('title')} placeholder='Title' style={style.titleBox} />
          </div>
          <textarea style={style.textarea} valueLink={this.linkState('body')} placeholder='Leave a comments'></textarea>
        </div>
        <Preview title={this.state.title} body={this.state.body} />
      </div>
    )
  }
});

var Preview = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <div>
        <h2>Preview</h2>
        <h3>{this.props.title}</h3>
        <div
          className='markdown-body' // github-markdown.css
          dangerouslySetInnerHTML={{
            __html: marked(this.props.body)
          }}
        />
      </div>
    )
  }
});

module.exports = Textarea;
