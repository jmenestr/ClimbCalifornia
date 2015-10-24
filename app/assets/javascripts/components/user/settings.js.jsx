(function(root){
  root.Settings = React.createClass({
    getInitialState: function() {
      return ({ 
        id: CurrentUserStore.currentUser().id,
        name: CurrentUserStore.currentUser().name,
        profile_pic: CurrentUserStore.currentUser().profile_pic,
        lat: CurrentUserStore.currentUser().lat,
        lng: CurrentUserStore.currentUser().lng,
        location: CurrentUserStore.currentUser().location,
        currentUser: CurrentUserStore.currentUser() })
    },

    componentDidMount: function() {
      CurrentUserStore.addCurrentUserChangeListener(this._handleChange);
      var input =  React.findDOMNode(this.refs.maps_autocomplete);
      var autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
        this.setState( { location_name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
      }.bind(this))
      ApiUtils.fetchCurrentUser();
    },

    componentWillUnmount: function() {
      CurrentUserStore.removeCurrentUserChangeListener(this._handleChange)
    },

    _handleChange: function() {
      this.setState({ 
        id: CurrentUserStore.currentUser().id,
        name: CurrentUserStore.currentUser().name,
        profile_pic: CurrentUserStore.currentUser().profile_pic,
        lat: CurrentUserStore.currentUser().lat,
        lng: CurrentUserStore.currentUser().lng,
        location: CurrentUserStore.currentUser().location,
        currentUser: CurrentUserStore.currentUser() })
    },

    handleNameChange: function(e) {
      this.setState({ name: e.target.value })
    },

     _mountImageUploader: function() {
      cloudinary.openUploadWidget({ cloud_name: 'climb-california', upload_preset: 'mbuivbmb'}, 
      this._handleImages);
    },

    handleSubmit: function() {
      var user = {
        id: this.state.id,
        name: this.state.name,
        lat: this.state.lat,
        lng: this.state.lng,
        location: this.state.location
      };

      var image = 
        this.state.profile_pic;
      ApiUtils.updateCurrentUser(user, image)
    },

    _handleImages: function(error, result) {
      var imageObj = result[0];
      // var image = { image_url: imageObj.url, image_name: imageObj.original_filename}
      var new_image = imageObj.url;
      this.setState({ profile_pic: new_image})
    },

    render: function() {
      return (
        <div className='my-account container-fluid'>
          <div className='header row'>
            <div className='col-sm-12'>
              <div className='page-header'>
                <h1> Your Account Settings
                </h1>
                <h3> It's all about you </h3>
              </div>
            </div>
          </div>
          <div className='user-info'>
              <h3> Basic Info </h3>
              <h5> Add a profile pic to let everyone see your awesomness!</h5>
              <a href='javascript:void(0)' onClick={this._mountImageUploader}>
                Add a profile picture
              </a>
            <form onSubmit={this.handleSubmit} className='user-info-form'>

              <div className='form-group'>
                <label htmlFor='userName'>Your Name</label>
                <input id='userName'
                  className='form-control'
                 type='text' value={this.state.name} onChange={this.handleNameChange} />
              </div>

              <div className='form-group'>
                <label for='location'>Your Location</label>
                <input id='location'
                className='form-control'
                 type='text' ref={'maps_autocomplete'} placeholder={this.state.location} onChange={this.handleLocationChange} />
              </div>
              <input type='submit' className='btn btn-success btn-lg' value="Update" />
            </form>

          </div>
        </div>
        )
    }
  })
})(this)