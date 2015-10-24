(function(root){

    root.Errors = React.createClass({
      getInitialState: function() {
        return ({ errors: ErrorStore.all() });
      },

      componentDidMount: function() {
        ErrorStore.addErrorsChangeListener(this._handleErrorsChange);
      },

      componentWillUnmount: function() {
        ErrorStore.removeErrorsChangeListener(this._handleErrorsChange);
      },

      _handleErrorsChange: function() {
        this.setState({ errors: ErrorStore.all() });
      },

      render: function() {
        var errors;
        if (this.state.errors.length == 0) {
          errors = (<div></div>);
        } else {
          errors = (
            <div className='errors'>
              <ul>
                {this.state.errors.map(function(error){
                  return (<li>{error}</li>);
                }.bind(this))}
              </ul>
            </div>
            );
        }
        return (errors);
      }

    });

})(this)