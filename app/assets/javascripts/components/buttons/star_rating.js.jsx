(function(root){
  root.StarRatingList = React.createClass({
    //Takes readOnly prop
    //Takes max
    //Takes rating
  componentWillMount: function() {
    this.size = this.props.size || "fa-2x"
    this.halfStar = (<li><i className={"fa fa-star-half-o " + this.size}></i></li>);
    this.fullStar = (<li><i className={"fa fa-star " + this.size}></i></li>)
    this.emptyStar = (<li><i className={"fa fa-star-o " + this.size}></i></li>)
  },

  renderReadOnly: function() {
    this.stars = [];
    var rating = Math.round(this.props.rating * 2)/2
    var fullStars;
    var halfStars = 0;
    if (rating % 1 == 0) {
      fullStars = rating;
    } else {
      fullStars = rating - 0.5;
      halfStars = 1;
    }
    var self = this;
    _(fullStars).times(function(n){ self.stars.push(self.fullStar)});
    _(halfStars).times(function(n){ self.stars.push(self.halfStar)});
    _(self.props.max - (fullStars + halfStars)).times(function(n){
      self.stars.push(self.emptyStar);
    });
    
  },

  renderClickable: function() {
    this.stars = [];
    for (var i = 1; i <= this.props.max; i++) {
      var clickHandler = this.props.clickHandler && this.props.clickHandler.bind(null, i);
      if (i <= this.props.rating) {
        this.stars.push(<li onClick={clickHandler}><i className="fa fa-star fa-2x filled"></i></li>)
      } else {
        this.stars.push(<li onClick={clickHandler}><i className="fa fa-star-o fa-2x unfilled"></i></li>)
      }
    }
  },

  render: function() {
    if (this.props.readOnly) {
      this.renderReadOnly();
    } else {
      this.renderClickable();
    }
      return (<ul className='star-rating cf'>{this.stars}</ul>);
    }   
  });

})(this)