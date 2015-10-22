(function(root){
  root.ImageViewer = React.createClass({
    getInitialState: function() {
      return ({ activeImage: 0});
    },

    _setActiveImage: function(idx) {
      this.setState({ activeImage: idx})
    },

    render: function() {
      
      return (
        <div className='image-viewer'>

          <div className='thumbnail-bar cf'>
            <div className='left-arrow'>
              <i className="fa fa-arrow-left fa-3x"></i>
            </div>
              {this.props.images.map(function(image, idx){
                var mask = (idx == this.state.activeImage) ? "" : 'masked';
                return (
                  <img className={'thumbnail-bar-img ' + mask}
                    onClick={this._setActiveImage.bind(null, idx)}
                    src={image.image_url}
                    />
                    );
              }.bind(this))}
            <div className='right-arrow'>
              <i className="fa fa-arrow-right fa-3x"></i>
            </div>
          </div>
          <div className='main-image'>
            <img src={this.props.images[this.state.activeImage].image_url} />
          </div>
        </div>
        )
    }
  })
})(this)