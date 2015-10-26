(function(root){

  //maybe make a list store and only load when this page is loaded?
  root.UserListIndex = React.createClass({
    getInitialState: function() {
      return ({ modalActive: false })
    },
    renderModal: function(adventure_id) {
      this.setState ({ modalActive: (<NewList  closeModal={this.closeModal} />) })
    },

    closeModal: function() {
      this.setState ({ modalActive: false })
    },

    render: function() {
      var modal = (this.state.modalActive) ? this.state.modalActive : "";
      debugger
      var newListBtn = (CurrentUserStore.currentUser().id == this.props.userId) ?
        (<button className='btn btn-success' onClick={this.renderModal} > New List </button>) : ""
      return (
      <div>
        {newListBtn}
        {modal}
        <div className='row user-list-masonry'>
          {this.props.lists.map(function(list) {
            return <ListItemIndex list={list} key={list.id} />
          })}
        </div>
      </div>
              )
    }
  })
})(this)