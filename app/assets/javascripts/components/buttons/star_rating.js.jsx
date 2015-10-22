(function(root){
  root.StarRatingList = React.createClass({
    //Takes readOnly prop
    //Takes max
    //Takes rating

  renderReadOnly: function() {
    this.stars = [];
    var score = this.props.rating || 5;
    var rating = Math.round(score * 2)/2
    var fullStars = 0;
    var halfStars = 0;
    if (rating % 1 == 0) {
      fullStars = rating;
    } else {
      fullStars = rating - 0.5;
      halfStars = 1;
    }
    var self = this;
    this.size = this.props.size || "fa-2x"
    _(fullStars).times(function(n){ self.stars.push(<li key={n + 'full'}><i className={"fa fa-star " + self.size}></i></li>)});
    _(halfStars).times(function(n){ self.stars.push(<li key={n + 'half'}><i className={"fa fa-star-half-o " + self.size}></i></li>)});
    _(self.props.max - (fullStars + halfStars)).times(function(n){
      self.stars.push(<li key={n + 'empty'}><i className={"fa fa-star-o " + self.size}></i></li>);
    });
    
  },

  renderClickable: function() {
    this.stars = [];
    for (var i = 1; i <= this.props.max; i++) {
      var clickHandler = this.props.clickHandler.bind(null, i);
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