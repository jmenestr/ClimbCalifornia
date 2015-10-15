(function(root){
root.ReviewForm = React.createClass({

  getInitialState: function() {
    return { content: "", rating: 3 };
  },

  handleChange: function(e) {
    this.setState({ content: e.target.value });
  },

  handleSlideChange: function(e) {
    var value = e.target.value;
    this.setState( { rating: value });
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
    ApiUtils.createReview(review);
    this.setState( { content: "", rating: 3 });
  },

  render: function() {
    return (
      <div className='row'>
        <div className='col-md-9'>
          <h4>Enter a new Review</h4>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor={'content'} value={this.state.content} >Review the Adventure Here</label>
              <textarea row='5'
               className='form-control' id={'content'} onChange={this.handleChange}></textarea>
            </div>
            <input type='range'
            min={'1'}  
            max={'5'}
            step={'1'}
            onChange={this.handleSlideChange}
            value={this.state.rating}
            />
            <input className='btn btn-success' type={'submit'} value="Review the Adventure" />
          </form>
        </div>
      </div>
      );
  }
  
})
})(this);