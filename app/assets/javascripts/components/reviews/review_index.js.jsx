(function(root){
  root.Reviews = React.createClass({

    getInitialState: function() {
      return ({ reviews: ReviewStore.all()})
    },

    componentDidMount: function() {
      ReviewStore.addReviewChangeListener(this._handleReviewChange);
      ApiUtils.fetchReviews(this.props.adventureId);
    },
    componentWillUMount: function() {
      ReviewStore.removeReviewChangeListener(this._handleReviewChange);
    },

    componentWillReceiveProps: function(newProps) {
      if (newProps.adventureId !== this.props.adventureId) {
      ApiUtils.fetchReviews(newProps.adventureId);
        
      }
    },
    
    _handleReviewChange: function() {
      this.setState({
        reviews: ReviewStore.all()
      });
    },

    _displayLoading: function() {
      return (
        <div> Reviews Loading </div>
        );
    },

    _displayReviews: function() {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Reviews</h3>
          </div>
            <div className="panel-body">
            {this.state.reviews.map(function(review){
              return(
                  <Review key={review.id} review={review} />
                );
            })}
            </div>
        </div>
        );
    },

    render: function() {
      var display;
      if (this.state.reviews == undefined) {
        display = this._displayLoading();
      } else {
        display = this._displayReviews();
      }
      return(
          display
        );
    }
  })
})(this)
