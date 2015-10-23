(function(root){

  //maybe make a list store and only load when this page is loaded?
  root.UserListIndex = React.createClass({

    render: function() {
      return (<div className='row user-list-masonry'>
              {this.props.lists.map(function(list) {
                return <ListItemIndex list={list} key={list.id} />
              })}
              </div>)
    }
  })
})(this)