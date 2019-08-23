/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const twitterUtil = __webpack_require__(/*! ./twitter_util.js */ "./frontend/twitter_util.js");

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

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");

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

/***/ }),

/***/ "./frontend/twitter_util.js":
/*!**********************************!*\
  !*** ./frontend/twitter_util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const twitterUtil = __webpack_require__(/*! ./twitter_util.js */ "./frontend/twitter_util.js");

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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map