(function(root){

  root.ListAdventureIndex = React.createClass({
    getInitialState: function() {
      return ({ modalActive: false })
    },

    _renderDisplay: function() {
      var display;
      if (this.props.adventures.length == 0) {
        display = (
        <div className="no-list-adventures jumbotron">
          <h2>Looks like you haven't added any adventures to the list!</h2>
          <p><Link to='/' className="btn btn-success btn-lg" role="button">Discover Adventure</Link></p>
        </div>
        )
        } else {

        display = (
      <div className='list-adventures-masonry'>
        {this.props.adventures.map(function(adventure) {
                    return ( 
                      <div className={"adventure-card card"}>
                      <RemoveListItem 
                        key={adventure.id}
                          list_id={this.props.list_id}
                            adventure_id={adventure.id}
                            key={adventure.id}
                            />
                        <AdventureIndexItem
                          renderModal={this.renderModal}
                          handleMouseOver={this.props.handleMouseOver}
                          handleMouseOut={this.props.handleMouseOut} 
                          adventure={adventure} key={adventure.id + adventure.title} />
                        </div>
                      );
                  }.bind(this))}
        </div>
        )
      }
      return display;
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
        <div >
            {modal}
            {this._renderDisplay()}
        </div>
        );
    }
  }); 

})(this)
