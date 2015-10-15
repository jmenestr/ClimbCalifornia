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
    // ApiUtil.createReview(review);
    this.setState( { content: "", rating: 3 });
  },

  render: function() {
    return (
      <div>
        <h4>Enter a new Review</h4>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor={'content'} value={this.state.content} >Review the Adventure Here</label>
            <textarea className='form-control' id={'content'} onChange={this.handleChange}></textarea>
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
      );
  }
  
})
})(this);