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

var GHTemplateMaker = React.createClass({
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
  handleChange: function(event) {
    // NOTE: This is for jquery-textcomplete
    // update state after completion.
    // FIXME: currently it doesn't support selecting with mouse click
    if (this.state.body !== event.target.value) {
      this.setState({ body: event.target.value });
    }
  },
  render() {
    var GHEditor = (
      <div className='gh-template-editor'>
        <div>
          <input type='text'
            valueLink={this.linkState('repo')}
            placeholder='Repository url' />
        </div>
        <div>
          <input type='text'
            valueLink={this.linkState('title')}
            placeholder='Title' />
        </div>
        <textarea
          ref='body'
          rows='10'
          valueLink={this.linkState('body')}
          onKeyUp={this.handleChange}
          placeholder='Leave a comments'
        ></textarea>
      </div>
    );
    return (
      <div className='gh-template-maker--app'>
        {GHEditor}
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
        <a href={this.url()}>{this.url()}</a>
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
      <div>
        <h2>Preview</h2>
        <h3>{this.props.title}</h3>
        <div
          className='markdown-body' // github-markdown.css
          ref='previewArea'
          dangerouslySetInnerHTML={{
            __html: marked(this.props.body)
          }}
        />
      </div>
    );
  }
});

module.exports = GHTemplateMaker;
