(function(root){
  root.AdventureIndexItem = React.createClass({
    mixins: [ReactRouter.History],


    render: function() {
      var imgSrc = this.props.adventure.image.image_url;
      var id = this.props.adventure.id;
      return (
          <div
            onMouseOver={this.props.handleMouseOver && this.props.handleMouseOver.bind(null,id)}
            onMouseOut={this.props.handleMouseOut && this.props.handleMouseOut}
            className="col-md-6 adventure-card thumbnail">
            <Link to={'adventures/' + id}>
              <img src={imgSrc} />
            </Link>
            <div className='card-caption' >
              <h4 className='thumbanil-title'>{this.props.adventure.title}</h4>
              <p className='thumbanil-local'>
                <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                {this.props.adventure.location_name}
              </p>
            </div>
            <AdventureSaveButton 
              adventure_id={this.props.adventure.id}
              current_user_save={this.props.adventure.current_user_save} 
            />
            <div className='distance'>
              <span className='badge'>{this.props.adventure.distance} miles away</span>
            </div>
          </div>
        
      )
    }
    
  }) 
})(this)
