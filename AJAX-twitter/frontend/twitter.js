const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$( function () {
  let $el = $(".follow-toggle");
  let $search = $('.user-search')
  Array.from($el).forEach ( el => {
    let follow = new FollowToggle($(el));
    follow.render();
  });

  Array.from($search).forEach ( el => {
    let user = new UsersSearch($(el));
    
  });


});