(function(root){
  root.AdventureIndex = React.createClass({
    getInitialState: function() {
      return { 
        adventures: AdventureStore.all(),
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


    render: function() {
     var modal = (this.state.modalActive) ? this.state.modalActive : "";
      var adventures = this.state.adventures.map(function(adventure) {
          return (
            <div>
            {modal}
            <div className="adventure-card card">
              <AdventureIndexItem
                renderModal={this.renderModal}
                handleMouseOver={this.props.handleMouseOver}
                handleMouseOut={this.props.handleMouseOut} 
                adventure={adventure}  />
            </div>
          </div>
            );
        }.bind(this));
          
        return (
        <div className={"cf masonry"} >
            {adventures}
        </div>
        );
    }
  });
})(this)

 