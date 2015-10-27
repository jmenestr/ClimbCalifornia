(function(root){

  var MAX_PER_PAGE = 10;
  root.AdventureIndex = React.createClass({
    getInitialState: function() {
      return { 
        adventures: AdventureStore.all(),
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
      this.setState( { adventures: AdventureStore.all() })
    },

    renderModal: function(adventure_id) {
      this.setState ({ modalActive: (<ModalListForm adventureId ={adventure_id} closeModal={this.closeModal} />) })
    },

    closeModal: function() {
      this.setState ({ modalActive: false })
    },

    handlePagination: function(page) {
      FilterActions.recievePage(page);
    },

    render: function() {
     var modal = (this.state.modalActive) ? this.state.modalActive : "";
     var lessMaxAdventures = (this.state.adventures.length < MAX_PER_PAGE);
     var pages;
     if (this.state.page == 1 && lessMaxAdventures) {
      pages = "";
     } else {
      pages = (<Pagination 
        handlePagination={this.handlePagination} 
        page={this.props.page} 
        morePages={!lessMaxAdventures} /> )
     }

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

 