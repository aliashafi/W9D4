const twitterUtil = {
  UnfollowAjax: function(user_id) {
    return $.ajax({
      method: "DELETE",
      url: `/users/${user_id}/follow`,
      dataType: "JSON"
    });
  },
  followAjax: function(user_id) {

    return $.ajax({
      method: "POST",
      url: `/users/${user_id}/follow`,
      dataType: "JSON"
    });
  },

  searchUsers: function(queryVal){
    // debugger
    return $.ajax({
      method: "GET",
      url: `/users/search?query=${queryVal}`,
      dataType: "JSON"
    })
  }

};

module.exports = twitterUtil;