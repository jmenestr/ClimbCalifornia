(function(root){
root.ReviewForm = React.createClass({

  getInitialState: function() {
    return { content: "", rating: 3.5 };
  },

  handleChange: function(e) {
    this.setState({ content: e.target.value });
  },

  handleRatingChange: function(rating) {
    this.setState( { rating: rating });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var adventureId = this.props.adventureId;
    var content = this.state.content;
    var rating = this.state.rating;
    var review = { 
      adventure_id: adventureId,
      content: content,
      rating: rating
      };
    ApiActions.clearErrors();
    ApiUtils.createReview(review);
    this.setState( { content: "", rating: 3 });
  },

  render: function() {
    return (
      <div className='row'>
        <div className='col-md-9'>
          <h4>Enter a new Review</h4>
          <Errors />
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              
              <textarea row='5'
               className='form-control'
               value={this.state.content}
                id={'content'} onChange={this.handleChange}></textarea>
            </div>
            <StarRatingList 
            readOnly={false}
            clickHandler={this.handleRatingChange}
            max={5}
            rating={this.state.rating} 
             />
            <input className='btn btn-success' type={'submit'} value="Review the Adventure" />
          </form>
        </div>
      </div>
      );
  }
  
})
})(this);