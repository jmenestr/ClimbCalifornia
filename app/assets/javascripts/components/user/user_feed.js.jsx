(function(root){



  root.UserFeed = React.createClass({

    getInitialState: function() {
      return ({ userFeed: [] })
    },

    componentDidMount: function() {
      UserFeedStore.addChangeEventListener(this._handleFeedChange);
      ApiUtils.fetchUserFeed();
    },

    componentWillUnmount: function() {
      UserFeedStore.removeChangeEventListener(this._handleFeedChange);
    },

    _handleFeedChange: function() {
      this.setState({ userFeed: UserFeedStore.all() });
    },

    renderModal: function(adventure_id) {
      this.setState ({ modalActive: (<ModalListForm adventureId ={adventure_id} closeModal={this.closeModal} />) })
    },

    closeModal: function() {
      this.setState ({ modalActive: false })
    },

    render: function() {
      var modal = (this.state.modalActive) ? this.state.modalActive : "";
      return (
        <div className='user-feed'>
        {modal}
          {this.state.userFeed.map(function(adventure){
            return <AdventureIndexItem renderModal={this.renderModal} adventure={adventure} key={adventure.id} />
          })}
        </div>
        )
    }
  })
})(this)