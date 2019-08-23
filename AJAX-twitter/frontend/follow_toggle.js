const twitterUtil = require('./twitter_util.js');

class FollowToggle {
  constructor ($el) {
    // debugger
    this.$el = $el;
    this.user_id = $el.data('user-id');
    this.followState = $el.data('initial-follow-state');
    this.$el.on("click", this.clickFollow.bind(this) );
  }

  clickFollow (e) {
    e.preventDefault();
    if (this.followState === "followed") {
  
    twitterUtil.UnfollowAjax(this.user_id).then(() => {
      this.followState = 'unfollowed';
      this.render();
    });
    } else {
      // debugger
     twitterUtil.followAjax(this.user_id).then(()=> {
      this.followState = 'followed';
      this.render();
    });
    }
    this.freezeFrame();
  }
  freezeFrame() {
    this.$el.attr("disabled","");
  }
  render() {
    // debugger;
    // this.$el.text.empty();
    this.$el.removeAttr("disabled");
    if (this.followState === "followed") {
      this.$el.text("Unfollow");
    } else {
      this.$el.text("Follow");
      
    }
  }

}

module.exports = FollowToggle;