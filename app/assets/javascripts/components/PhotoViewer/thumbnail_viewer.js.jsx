(function(root){
  root.ImageViewer = React.createClass({
    getInitialState: function() {
      return ({ 
        activeImage: 0,
        images: this.props.images,
        savedImage: 0
      });
    },
    componentWillReceiveProps: function(newProps){
      // alert("GOT PROPS");
      this.setState({ images: newProps.images });
    },
    _setActiveImage: function(idx) {
      this.setState({ activeImage: idx});
    },

    _handleMouseOver: function(idx) {
      this.setState ({ activeImage: idx, savedImage: this.state.activeImage})
    },

    _handleClick: function() {

          var first = this.state.images.shift();
          this.state.images.push(first);
          this.setState({ images: this.state.images })
    },

    render: function() {
      
        var hidden, images;
        if (this.state.images.length <= 4) {

           hidden = "hidden";
           images = this.state.images.map(function(image, idx) {
            var mask = (idx == this.state.activeImage) ? "" : 'masked';
                return (
                  <img className={'thumbnail-bar-img ' + mask}
                    onMouseOver={this._handleMouseOver.bind(null, idx)}
                    onClick={this._setActiveImage.bind(null, idx)}
                    src={image.image_url}
                    />
                    );
              }.bind(this))
        } else {
            hidden = "";
            images = this.state.images.slice(0,5).map(function(image, idx) {
            var mask = (idx == this.state.activeImage) ? "" : 'masked';
                return (
                  <img className={'thumbnail-bar-img ' + mask}
                    onMouseOver={this._handleMouseOver.bind(null, idx)}
                    onClick={this._setActiveImage.bind(null, idx)}
                    src={image.image_url}
                    />
                    );
              }.bind(this))
        }

      return (
        <div className='image-viewer'>
          <div className='thumbnail-wrapper'>
            <div
             onClick={this._handleClick}
             className={'left-arrow ' + hidden}>
              <i className="fa fa-arrow-left fa-3x"></i>
            </div>
            <div className='thumbnail-bar cf'>
              {images}
            </div>
            <div className={'right-arrow ' + hidden}
            onClick={this._handleClick}>
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