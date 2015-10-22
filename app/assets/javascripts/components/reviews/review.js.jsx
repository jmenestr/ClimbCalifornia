(function(root){
  root.Review = React.createClass({
      render: function() {
        var review = this.props.review
        return (
              <div className='review cf'>
                <div className='user-info col-md-3'>
                  <div className='review-rating'>
                    <StarRatingList readOnly={true}
                      rating={this.props.review.rating}
                      max={5}
                      size={'fa-1x'} />
                  </div>
                  <img src={review.review_author.profile_pic} className='profile_pic' />
                  <h5><Link to={'users/' + review.review_author.id}>{review.review_author.name}</Link></h5>
                  <h6>{review.date} ago</h6>
                </div>
                <div className='review-content col-md-9'>
                <div className='arrow-left'></div>
                  <p>{review.content}</p>

                </div>
              </div>
              );
      }
  })
})(this)