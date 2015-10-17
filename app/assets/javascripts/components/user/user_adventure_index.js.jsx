(function(root){
root.UserAdventureIndex = React.createClass({
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

  _renderAdventures: function() {
    var adventures = this.props.adventures.map(function(adventure) {
            return (<AdventureIndexItem
              adventure={adventure} key={adventure.id} />
            );
        }.bind(this));

        return (
         <div className={"cf row"} >
            {adventures}
          </div>
        );
    },

  
    render: function() {
      var display;
      if (this.props.adventures.length == 0) {
        display = this._zeroAdventuresMessage();
      } else {
        display = this._renderAdventures();
      }
      return (
        display
        )
    }
  }); 

})(this)
