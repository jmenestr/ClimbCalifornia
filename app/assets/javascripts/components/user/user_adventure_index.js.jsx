(function(root){
root.UserAdventureIndex = React.createClass({
  getInitialState: function() {
    return ({ modalActive: false })
  },

  _zeroAdventuresMessage: function() {
    var message;
    if (this.props.savedAdventures) {
      message = (
      <div className="find-adventure-message jumbotron">
        <h2>Looks like you haven't saved any adventures yet! We can help you fix that.</h2>
        <p><Link to='/' className="btn btn-success btn-lg" role="button">Discover Adveture</Link></p>
      </div>
      )
    } else {
      message = (
      <div className="create-adventure-message jumbotron">
        <h2>You must be new. We see you haven't created an adventure yet. We can help. </h2>
        <p><Link to='/adventures/new' className="btn btn-success btn-lg" role="button">Create an adventure</Link></p>
      </div>
      )
    }
    return message;
  },
   renderModal: function(adventure_id) {
      this.setState ({ modalActive: (<ModalListForm adventureId ={adventure_id} closeModal={this.closeModal} />) })
    },

    closeModal: function() {
      this.setState ({ modalActive: false })
    },

  
    render: function() {
      var modal = (this.state.modalActive) ? this.state.modalActive : "";
      var adventures = this.props.adventures.map(function(adventure) {
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
        <div className={"cf user-show-masonry"} >
          {modal}
            {adventures}
        </div>
        );
    }
  }); 

})(this)
