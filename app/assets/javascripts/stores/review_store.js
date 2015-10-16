(function(root){
  var REVIEWS_CHANGED = "REVIEWS_CHANGED";

  var _reviews = [];
  var _average_score = 3;

  var _updateAllReviews  = function(reviews) {
    _reviews = reviews.reviews;
    _average_score = _average_score;
    ReviewStore.emit(REVIEWS_CHANGED)
  }

  var _addReview = function(review) {
   _reviews.push(review);
   _average_score = (_average_score + review.rating)/_reviews.length
    ReviewStore.emit(REVIEWS_CHANGED);
  }

  root.ReviewStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _reviews;
    },

    averageScore: function() {
      return _average_score;
    },

    addReviewChangeListener: function(callback) {
      this.addListener(REVIEWS_CHANGED, callback);
    },

    removeReviewChangeListener: function(callback) {
      this.removeListener(REVIEWS_CHANGED, callback);
    },


    dispatcherId: AppDispatcher.register(function(action) {
      switch (action.actionType) {
        case ReviewConstants.REVIEWS_RECIEVED:
          _updateAllReviews(action.payload);
          break;
        case ReviewConstants.REVIEW_RECIEVED:
          _addReview(action.payload);
          break;
        default:
          break;
      }
    })
  });
})(this)