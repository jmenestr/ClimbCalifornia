(function(root){
  root.AdventureForm = React.createClass({


    getInitialState: function() {
      return { 
        description: "",
        features: FeatureStore.all(),
        activities: ActivityStore.all(),
        lat: undefined,
        lng: undefined,
        title: "" ,
        images: [],
        location_name: "",
        newFeature: "",
        selectedFeatures: {},
        selectedActivities: {}
      };
    },
    componentDidMount: function() {
      FeatureStore.addFeatureChangeListener(this._recieveFeatures.bind(this));
      ActivityStore.addActivityChangeListener(this._recieveActivities.bind(this));
      var input =  React.findDOMNode(this.refs.maps_autocomplete);
      var autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
        this.setState( { location_name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
      }.bind(this))
      ApiUtils.fetchActivities();
      ApiUtils.fetchFeatures();
    },

    componentWillUnmount: function() {
    FeatureStore.removeFeatureChangeListener(this._recieveFeatures.bind(this));
    ActivityStore.removeActivityChangeListener(this._recieveActivities.bind(this));

    },

    _recieveFeatures: function() {
      this.setState({ features: FeatureStore.all() });
    },

    _recieveActivities: function() {
      this.setState({ activities: ActivityStore.all() });
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
      var image = { image_url: imageObj.url}
      var new_image = this.state.images.concat(image);
      this.setState({ images: new_image})
    },

    _handleFeatureSelect: function(e) {
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

    _handleActivitySelect: function(e) {
      console.log('e');
      var option = e.target.selectedOptions[0];
      var selection = {};
      selection[option.value] = option.innerHTML
      
      if (_.keys(this.state.selectedActivities).indexOf(option.value) == -1) {
        var newSelectedActivities = _.extend({}, this.state.selectedActivities, selection)
        this.setState({ selectedActivities: newSelectedActivities});
      } 
    },

    _removeSelectedActivity: function(e) {
      e.preventDefault();
      var id = e.target.getAttribute('data-id');
      var newSelectedActivites = _.omit(this.state.selectedActivities, id);
      this.setState({selectedActivities: newSelectedActivites});
    },

    _handleSubmit: function(e) {
      e.preventDefault();
      var adventure = {
        title: this.state.title,
        description: this.state.description,
        lat: this.state.lat,
        lng: this.state.lng,
        location_name: this.state.location_name,
        feature_ids: _.keys(this.state.selectedFeatures).concat(""),
        activity_ids: _.keys(this.state.selectedActivities).concat("")
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
                  <h5> Can't find it? Click on the map! </h5>
                </div>

                <div className='form-group jumbotron image-upload-holder' onClick={this._mountImageUploader} id='upload_widget_opener'>
                  <h2>We want to see your adventure!</h2>
                  <p>Add as many images as you want! </p>
                </div>
                <div className='thumbnail-container cf'>
                  {this.state.images.map(function(img){
                    return <img src={img.image_url} />
                  })}
                </div>


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
              </form>

              <div className='col-md-5 form-group'>
                <h4>Features: </h4> 
                <select onChange={this._handleFeatureSelect} className='form-control' multiple={true} >
                  {this.state.features.map(function(feature){
                    return (<option value={feature.id} >{feature.name}</option>);
                  })}
                </select>

                <div className='selected panel panel-success form-group'>
                  <h4 className='panel-heading'>Your Selected Features</h4>
                  <div className='panel-body'>
                    { _.keys(this.state.selectedFeatures).map(function(id) {
                      return (<div 
                        className='tag'
                        data-id={id}
                        key={id}
                        onClick={this._removeSelectedFeature}>{this.state.selectedFeatures[id]}</div>);
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
                  <div onClick={this._addFeature} className='tag'>Add Feature</div>
                </div>


                <h4>Activities: </h4> 
                <select onChange={this._handleActivitySelect} className='form-control' multiple={true} >
                  {this.state.activities.map(function(activity){
                    return (<option value={activity.id} >{activity.name}</option>);
                  })}
                </select>
                <div className='selected panel panel-success form-group'>
                  <h4 className='panel-heading'>Your Selected Activities </h4>
                  <div className='panel-body'>
                    { _.keys(this.state.selectedActivities).map(function(id) {
                      return (<button 
                        className='btn btn-success btn-sm'
                        data-id={id}
                        key={id}
                        onClick={this._removeSelectedActivity}>{this.state.selectedActivities[id]}</button>);
                    }.bind(this))}
                  </div>
                </div>

                  <FormMap cords={{lat: this.state.lat, lng: this.state.lng}} />
                </div>


          </div>
        </div>)
    }
  }) 
})(this)
