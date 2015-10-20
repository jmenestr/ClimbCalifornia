 (function(root){
  root.ListButton = React.createClass({

    getInitialState: function() {
      return ({ active: false })
    },

    openModal: function() {
      this.setState({ active: true });
    },

    closeModal: function() {
      this.setState({ active: false });
    },

    render: function() {
      var modal = this.state.active ? (<ModalListForm adventureId ={this.props.adventureId} closeModal={this.closeModal} />) : ""
      return (
          <div className='list-button'>
            <button onClick={this.openModal} className={'btn btn-sm btn-primary'}>
              <span className={'glyphicon glyphicon-pencil'}></span>
            </button>
            {modal}
          </div>
          );
    }
  });

})(this)