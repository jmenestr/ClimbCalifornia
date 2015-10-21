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
      <div className='user-index-card card'>
        <Link to={'users/' + this.props.user.id}>
          <img src={this.props.user.profile_pic} />
        </Link>
        <div className='caption cf'>
          <div className='description cf'>
            <h5>{this.props.user.name}</h5>
          </div>
        </div>
          <div className='buttons'>
            {btn}
          </div>
      </div>  
      )
    }
  })

})(this)