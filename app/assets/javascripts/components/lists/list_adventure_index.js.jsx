(function(root){

  root.ListAdventureIndex = React.createClass({
    _renderDisplay: function() {
      var display;
      if (this.props.adventures.length == 0) {
        display = (
        <div className="no-list-adventures jumbotron">
          <h2>Looks like you haven't added any adventures to the list!</h2>
          <p><Link to='/' className="btn btn-success btn-lg" role="button">Discover Adveture</Link></p>
        </div>
        )
        } else {
        display = (
      <div className='list-adventures-masonry'>
        {this.props.adventures.map(function(adventure) {
                    return ( 
                      <div className={"list-adventure"}>
                      <RemoveListItem 
                        key={adventure.id}
                          list_id={this.props.list_id}
                            adventure_id={adventure.id}
                            key={adventure.id}
                            />
                        <AdventureIndexItem
                          handleMouseOver={this.props.handleMouseOver}
                          handleMouseOut={this.props.handleMouseOut} 
                          adventure={adventure} key={adventure.id + adventure.name} />
                        </div>
                      );
                  }.bind(this))}
        </div>
        )
      }
      return display;
    },

  
    render: function() {
     
          
        return (
        <div >
            {this._renderDisplay()}
        </div>
        );
    }
  }); 

})(this)
