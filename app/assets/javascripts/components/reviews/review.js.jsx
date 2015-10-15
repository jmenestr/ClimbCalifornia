(function(root){
  root.Review = React.createClass({
      render: function() {
        var review = this.props.review
        return (
              <div className='review cf'>
                <div className='user-info col-md-3'>
                  <img src={review.review_author.profile_pic} className='profile_pic' />
                  <h5>{review.review_author.name}</h5>
                  <h6>{review.date}</h6>
                </div>
                <div className='review-content col-md-9'>
                  <p>{review.content}</p>
                </div>
              </div>
              );
      }
  })
})(this)