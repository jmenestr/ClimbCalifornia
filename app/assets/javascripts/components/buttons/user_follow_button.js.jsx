 (function(root){
  root.UserFollowButton = React.createClass({

    _handleSaveClick: function(e) {
      if(!!this.props.current_user_follow) {
        var follow_id = 
          this.props.current_user_follow.id;
        //unsave
        ApiUtils.deleteUserFollow(follow_id)
      } else {
        //save
        ApiUtils.createUserFollow(this.props.user_id)
      }
    },

    render: function() {
      var saved = !!this.props.current_user_follow;
      var text, button;
      if (saved) {
          button = "btn-danger";
          text = "Unfollow"
        } else {
          button = "btn-success";
          text = "Follow"
        }
    return (
        <div className='save-button'>
          <button onClick={this._handleSaveClick} className={'btn btn-md ' + button}>
            {text}
          </button>
        </div>
        );
    }
  });

})(this)