(function(root){
  root.ListItemIndex = React.createClass({

    _handleEmptyList: function() {
      return (<div className='thumbnail card list-item-index'>
          <Link to={"/list/" + this.props.list.id}>
            <img src='http://res.cloudinary.com/climb-california/image/upload/v1445558017/331570_10151003422287725_252585428_o_qzyxzz.jpg' className='list-index-img' />
            <h5>This list is lonley.</h5>
           </Link>
        </div>)
    },

    _handleFullList: function() {
      return (
        <div className='thumbnail card list-item-index'>
          <Link to={"/list/" + this.props.list.id}>
            <img src={this.props.list.image} className='list-index-img' />
            <h5>{ this.props.list.title} </h5>
           </Link>
        </div>)
    },


    render: function() {
      debugger;
      var display = (this.props.list.image) ? this._handleFullList() : this._handleEmptyList();
      return (display)
    }
  })
})(this)