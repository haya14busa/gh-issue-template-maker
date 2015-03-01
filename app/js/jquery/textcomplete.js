// Script for https://github.com/yuku-t/jquery-textcomplete
var $ = require('jQuery');
var _ = require('lodash');
var consts = require('utils/const');
var emojies = require('emojify.js').emojiNames;

var emoji_template = _.template('<img src="<%= basepath %>/<%= value %>.png"></img><%= value %>');

module.exports = function(selector) {
  $(selector).textcomplete([{
    match: /\B:([\-+\w]*)$/,
    search: function (term, callback) {
      callback($.map(emojies, function (emoji) {
        return emoji.indexOf(term) === 0 ? emoji : null;
      }));
    },
    template: function (value) {
      return emoji_template({basepath: consts.path.emoji, value: value})
    },
    replace: function (value) {
      return ':' + value + ': ';
    },
    index: 1
  }]);
};
