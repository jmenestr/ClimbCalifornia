(function(root){
  root.UserIndexItem = React.createClass({
    render: function() {
      return (
      <div className='thumbnail user-index-card col-sm-3'>
        <img src={this.props.user.profile_pic} />
        <h5><Link to={'users/' + this.props.user.id}>{this.props.user.name}</Link></h5>
      </div>  
      )
    }
  })
})(this)