(function(root){


  root.UserIndexItem = React.createClass({

    displayFollow: function() {
      if (window.CURRENT_USER.id !== this.props.user.id) {
           return (<UserFollowButton user_id={this.props.user.id}
                  current_user_follow={this.props.user.current_user_follow} />);
      } else {
        return "";
      }
    },
    
    render: function() {
      var btn = this.displayFollow();
      return (
      <div className='thumbnail user-index-card col-sm-3'>
        <img src={this.props.user.profile_pic} />
        <h5><Link to={'users/' + this.props.user.id}>{this.props.user.name}</Link></h5>
        {btn}
      </div>  
      )
    }
  })

})(this)