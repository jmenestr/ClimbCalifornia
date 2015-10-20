(function(root){
  root.ListItemIndex = React.createClass({
    render: function() {
      return (
        <div className='thumbnail list-item-index col-md-4'>
          <img src={this.props.list.image} className='list-index-img' />
          <Link to={"/list/" + this.props.list.id}>{ this.props.list.title} </Link>
        </div>)
    }
  })
})(this)