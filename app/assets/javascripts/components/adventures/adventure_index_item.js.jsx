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
            >
              <Link to={'adventures/' + id}>
                <img src={imgSrc} />
              </Link>
              <div className='buttons'>
                <AdventureSaveButton 
                  adventure_id={this.props.adventure.id}
                  current_user_save={this.props.adventure.current_user_save} 
                />
                <ListButton
                renderModal={this.props.renderModal}
                closeModal={this.props.closeModal} 
                adventureId={this.props.adventure.id} />
              </div>
            <div className='card-caption' >
              <div className='description'>
                <h4 className='thumbanil-title'>{this.props.adventure.title}</h4>
                <p className='thumbanil-local'>
                  <span className="glyphicon glyphicon-globe" aria-hidden="true"></span>
                  {this.props.adventure.location_name}
                </p>
              </div>
            </div>
            <div className='distance'>
              <span className='badge'>{this.props.adventure.distance} miles away</span>
            </div>
          </div>


        
      )
    }
    
  }) 
})(this)
