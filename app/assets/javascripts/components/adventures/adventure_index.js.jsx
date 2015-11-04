(function(root){

  root.AdventureIndex = React.createClass({
    getInitialState: function() {
      return { 
        adventures: AdventureStore.all(),
        firstPage: AdventureStore.isFirstPage(),
        lastPage: AdventureStore.isLastPage(),
        moreAdventures: true,
        modalActive: false
         }
    },

    componentDidMount: function() {
      AdventureStore.addAllAdventuresChangeListener(this._handleChange)
    },

    componentWillUnmount: function() {
      AdventureStore.removeAllAdventuresChangeListener(this._handleChange)
    },

    _handleChange: function() {
      this.setState( { 
        adventures: AdventureStore.all(),
        firstPage: AdventureStore.isFirstPage(),
        lastPage: AdventureStore.isLastPage(), })
    },

    renderModal: function(adventure_id) {
      this.setState ({ modalActive: true  })
      this.modal = <ModalListForm adventureId ={adventure_id} closeModal={this.closeModal} />
    },

    closeModal: function() {
      this.setState ({ modalActive: false });
      this.modal = null;
    },

    handlePagination: function(page) {
      FilterActions.recievePage(page);
    },

    render: function() {
     var modal = (this.state.modalActive) ? this.modal : "";
     var pages = (<Pagination 
        handlePagination={this.handlePagination} 
        page={this.props.page} 
        isFirstPage={this.state.firstPage}
        isLastPage={this.state.lastPage} /> )
 
      var adventures = this.state.adventures.map(function(adventure) {
          return (
            <div key={adventure.id} className="adventure-card card">
              <AdventureIndexItem         
                renderModal={this.renderModal}
                handleMouseOver={this.props.handleMouseOver}
                handleMouseOut={this.props.handleMouseOut} 
                adventure={adventure}  />
          </div>
            );
        }.bind(this));
          
        return (
        <div>
          <div className={"cf masonry"} >
              {modal}
              {adventures}
          </div>
          <div className='row'>
            {pages}
          </div>
        </div>
        );
    }
  });
})(this)

 