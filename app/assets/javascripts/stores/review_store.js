(function(root){
  var REVIEWS_CHANGED = "REVIEWS_CHANGED";

  var _reviews = [];
  var _total_rating = 0;

  var _updateAllReviews  = function(reviews) {
    _reviews = reviews.reviews;
    _total_rating = reviews.total_rating;
    ReviewStore.emit(REVIEWS_CHANGED)
  }

  var _addReview = function(review) {
   _reviews.push(review);
   _total_rating = (_total_rating + review.rating)
    ReviewStore.emit(REVIEWS_CHANGED);
  }

  root.ReviewStore = _.extend({}, EventEmitter.prototype, {
    all: function() {
      return _reviews;
    },

    averageScore: function() {
      return _total_rating/_reviews.length;
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