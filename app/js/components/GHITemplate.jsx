// GHITemplate
// GitHub Issues Template
var React = require('react/addons');
var _ = require('lodash');
var consts = require('utils/const'); // *
var textcomplete = require('jquery/textcomplete'); // *
var marked = require('marked');
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
var emojify = require('emojify.js');
emojify.setConfig({
  img_dir: consts.path.emoji,
  ignore_emoticons: true
});

var LinkedStateMixin = React.addons.LinkedStateMixin
var PureRenderMixin = React.addons.PureRenderMixin;

var style = {
  mb10: {
    marginBottom: 10,
  },
  input: {
    width: 400,
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
      body: '',
      repo: 'https://github.com/{owner}/{repo}',
    };
  },
  componentDidMount: function() {
    textcomplete(this.refs.body.getDOMNode());
  },
  bodyOnKeyUp: function(event) {
    // NOTE: This is for jquery-textcomplete
    // update state after completion.
    if (this.state.body !== event.target.value) {
      this.setState({ body: event.target.value });
    }
  },
  render() {
    return (
      <div>
        <div> {/* input */}
          <div style={style.mb10}>
            <input type='text' valueLink={this.linkState('repo')} placeholder='Url' style={style.input} />
          </div>
          <div style={style.mb10}>
            <input type='text' valueLink={this.linkState('title')} placeholder='Title' style={style.input} />
          </div>
          <textarea
            ref='body'
            style={style.textarea}
            valueLink={this.linkState('body')}
            onKeyUp={this.bodyOnKeyUp}
            placeholder='Leave a comments'
          ></textarea>
        </div>
        <GenerateURL title={this.state.title} body={this.state.body} repo={this.state.repo} />
        <Preview title={this.state.title} body={this.state.body} />
      </div>
    );
  }
});

var GenerateURL = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    repo: React.PropTypes.string.isRequired
  },
  // --
  template: _.template('<%= repo %>/issues/new?title=<%= title %>&body=<%= body %>'),
  url: function() {
    return this.template({
      repo: this.props.repo,
      title: encodeURIComponent(this.props.title),
      body: encodeURIComponent(this.props.body)
    });
  },
  // --
  render() {
    return (
      <div>
        <h2>URL</h2>
        <pre>{this.url()}</pre>
      </div>
    );
  }
});

var Preview = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired
  },
  componentDidUpdate: function() {
    emojify.run(this.refs.previewArea.getDOMNode());
  },
  render() {
    return (
      <div ref='previewArea'>
        <h2>Preview</h2>
        <h3>{this.props.title}</h3>
        <div
          className='markdown-body' // github-markdown.css
          dangerouslySetInnerHTML={{
            __html: marked(this.props.body)
          }}
        />
      </div>
    );
  }
});

module.exports = Textarea;
