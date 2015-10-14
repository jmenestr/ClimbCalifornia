(function(root){
  root.AdventureForm = React.createClass({


    getInitialState: function() {
      return { 
        description: "",
        features: FeatureStore.all(),
        lat: undefined,
        lng: undefined,
        title: "" ,
        images: [],
        location_name: "",
        newFeature: "",
        selectedFeatures: {}
      };
    },
    componentDidMount: function() {
      FeatureStore.addFeatureChangeListener(this._recieveFeatures.bind(this));
      var input =  React.findDOMNode(this.refs.maps_autocomplete);
      var autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
        this.setState( { location_name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
      }.bind(this))

      ApiUtils.fetchFeatures();
    },

    componentWillUnmount: function() {
    FeatureStore.removeFeatureChangeListener(this._recieveFeatures.bind(this));
    },

    _recieveFeatures: function() {
      this.setState({ features: FeatureStore.all() });
    },

    _handleTitleChange: function(e) {
      this.setState({ title: e.target.value })
    },

    _handleDescriptionchange: function(e) {
      this.setState({ description: e.target.value })
    },

    _handleLocationChange: function(e) {
      this.setState({ title: e.target.value })
    },

    _mountImageUploader: function() {
      cloudinary.openUploadWidget({ cloud_name: 'climb-california', upload_preset: 'mbuivbmb'}, 
      this._handleImages);
    },

    _handleImages: function(error, result) {
      var imageObj = result[0];
      var image = { image_url: imageObj.url, image_name: imageObj.original_filename}
      var new_image = this.state.images.concat(image);
      this.setState({ images: new_image})
    },

    _handleSelect: function(e) {
      var option = e.target.selectedOptions[0];
      var selection = {};
      selection[option.value] = option.innerHTML
      
      if (_.keys(this.state.selectedFeatures).indexOf(option.value) == -1) {
        var newSelectedFeatures = _.extend({}, this.state.selectedFeatures, selection)
        this.setState({ selectedFeatures: newSelectedFeatures});
      } 
    },

    _removeSelectedFeature: function(e) {
      var id = e.target.getAttribute('data-id');
      var newSelectedFeatures = _.omit(this.state.selectedFeatures, id);
      this.setState({selectedFeatures: newSelectedFeatures});
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      var adventure = {
        title: this.state.title,
        description: this.state.description,
        lat: this.state.lat,
        lng: this.state.lng,
        location_name: this.state.location_name,
        feature_ids: _.keys(this.state.selectedFeatures).concat("") 
      };
      var pictures = this.state.images;


      ApiUtils.createAdventure(adventure, pictures);
    },

    _handeFeatureChange: function(e) {
      this.setState({ newFeature: e.target.value })
    },

    _addFeature: function() {
      var feature = { name: this.state.newFeature }
      ApiUtils.createFeature(feature);
    },

    render: function() {
      var keys = _.keys(this.state.selectedFeatures)
      return (

        <div className='adventure-form container'>
          <div className='row'>
            <form  onSubmit={this._handleSubmit} id='new_adventure'>

              <div className='col-md-7 form-fields'>
                <div className='form-group'>
                  <input className={'form-control'}
                    onChange={this._handleTitleChange}
                     type="text" 
                     placeholder='Give us a Adventure Title!'
                     value={this.state.title} />
                </div>

                <div className='form-group'>
                  <label htmlFor={'form-location'} >Where is your adventure</label>
                  <input id='form-location' type='text' className='form-control' ref={'maps_autocomplete'} />
                </div>

                <div className='form-group jumbotron image-upload-holder' onClick={this._mountImageUploader} id='upload_widget_opener'>
                  <h2>We want to see your adventure!</h2>
                  <p>Click here to upload up to 4 images of your adventure.</p>
                </div>
                <div className='thumbnail_container'></div>


                <div className='form-group'>
                  <label htmlFor={'description'}>Description </label>
                  <textarea 
                  onChange={this._handleDescriptionchange}
                  id="description" 
                  className="form-control"
                  placeholder='Give us the skinny on your trip'
                  value={this.state.description}
                   rows="4"></textarea>          
                </div>

                <div className='form-group'>
                  <input type="submit" value='Create Adventure' className='btn btn-success' />
                   
                </div>
              </div>

              <div className='col-md-5 form-group'>
                <h4>Features: </h4> 
                <select onChange={this._handleSelect} className='form-control' multiple={true} >
                  {this.state.features.map(function(feature){
                    return (<option value={feature.id} >{feature.name}</option>);
                  })}
                </select>

                <div className='selected panel panel-success form-group'>
                  <h4 className='panel-heading'>Your Selected Features</h4>
                  <div className='panel-body'>
                    { keys.map(function(id) {
                      return (<button 
                        className='btn btn-success btn-sm'
                        data-id={id}
                        key={id}
                        onClick={this._removeSelectedFeature}>{this.state.selectedFeatures[id]}</button>);
                    }.bind(this))}
                  </div>
                </div>

                <div className='add_feature form-group'>
                  <div className='form-group'>
                    <h5>Don't see one of ours that fits your adventure? Add your own!</h5>
                    <input className='form-control' 
                    value={this.state.newFeautre} 
                    onChange={this._handeFeatureChange}
                    placeholder={'Add your feature'} />
                  </div>
                  <button onClick={this._addFeature} className='btn btn-small btn-block'>Add Feature</button>
                </div>

                <div className='form-group' >
                </div>

                  <FormMap cords={{lat: this.state.lat, lng: this.state.lng}} />
                </div>

              </form>
          </div>
        </div>)
    }
  }) 
})(this)
