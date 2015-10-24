 (function(root){
  root.ListButton = React.createClass({

    getInitialState: function() {
      return ({ active: false })
    },

    openModal: function() {
      window.setTimeout(function() {
        this.setState( {active: true})}.bind(this), 0)

      // this.setState({ active: true });
    },


    closeModal: function() {
      this.setState({ active: false });
    },

    render: function() {
      
      return (
          <div className='list-button'>
            <button onClick={this.props.renderModal.bind(null, this.props.adventureId)} className={'btn btn-sm btn-primary'}>
              <i className="fa fa-plus-circle fa-1x"></i>
            </button>
          </div>
          );
    }
  });

})(this)