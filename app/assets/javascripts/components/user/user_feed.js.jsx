(function(root){


  var MAX_PER_PAGE = 10;
  root.UserFeed = React.createClass({

    getInitialState: function() {
      return ({ 
        userFeed: [],
        page: 1 })
    },

    componentDidMount: function() {
      UserFeedStore.addChangeEventListener(this._handleFeedChange);
      ApiUtils.fetchUserFeed(this.state.page);
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

    handlePagination: function(page) {
      ApiUtils.fetchUserFeed(page);
      this.setState({ page: page })
    },

    closeModal: function() {
      this.setState ({ modalActive: false })
    },

    render: function() {
      var modal = (this.state.modalActive) ? this.state.modalActive : "";
      var lessMaxAdventures = (this.state.userFeed.length < MAX_PER_PAGE);
       var pages;
       if (this.state.page == 1 && lessMaxAdventures) {
        pages = "";
       } else {
        pages = (<Pagination 
          handlePagination={this.handlePagination} 
          page={this.state.page} 
          morePages={!lessMaxAdventures} /> )
       }
      var adventures = this.state.userFeed.map(function(adventure) {
          return ( 
            <div className="adventure-card card">
              <AdventureIndexItem
                renderModal={this.renderModal}
                handleMouseOver={this.props.handleMouseOver}
                handleMouseOut={this.props.handleMouseOut} 
                adventure={adventure} key={adventure.id} />
              </div>
            );
        }.bind(this));
          
        return (
          <div>
            <div className='row'>
              <div className='page-header'>
                <h2>Explore adventures we think you might like!</h2>
              </div>
            </div>
            <div className={"cf container-fluid user-feed-masonry"} >
              {modal}
              {adventures}
            </div>
            {pages}
          </div>
        );
    }
  })
})(this)