(function(root){
  root.AdventureIndexItem = React.createClass({
    mixins: [ReactRouter.History],
    render: function() {
      var imgSrc = this.props.adventure.image.image_url;
      var id = this.props.adventure.id;
      return (
        
          <div className="col-md-6 adventure-card thumbnail">
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
            <div className='save-button'>
              <button className='btn btn-sm btn-success'>
                <span className='glyphicon glyphicon-heart-empty'></span>
              </button>
            </div>
          </div>
        
      )
    }
    
  }) 
})(this)
