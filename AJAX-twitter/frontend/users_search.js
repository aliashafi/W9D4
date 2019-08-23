const twitterUtil = require('./twitter_util.js');

class UsersSearch {
  constructor($el){
    this.$el = $el;
    this.$ul = $el.find('users li');
    this.$input = $el.find('input');
    this.$el.on("input", this.handleInput.bind(this));

  }

  handleInput(e){
    // e.preventDefault();
    // debugger

    twitterUtil.searchUsers(e.target.value).then();

    
  }

}

module.exports = UsersSearch;