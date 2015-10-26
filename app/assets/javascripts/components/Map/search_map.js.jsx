(function(root){
    root.SearchMap = React.createClass({
    getInitialState: function() {
      return { markers: {},
       search_not_bound: true,
       map_set: false };
    },
    
    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      CurrentUserStore.addCurrentUserChangeListener(this._setMap);
      ApiUtils.fetchCurrentUser();
      var mapOptions = {
        center: {lat: 37.7833, lng: -122.416},
        zoom: 3
      };

      this.map = new google.maps.Map(map, mapOptions);
      this._handleMapIdle();
      
      AdventureStore.addAllAdventuresChangeListener(this._handleChange);

    }, 

    componentWillReceiveProps: function(newProps) {
      if (this.props.placesSearch !== undefined && this.state.search_not_bound) {
        this._handleLocationSearch();
        this.setState({search_not_bound: false});
      }
      if(newProps.selectedMarker && this.state.markers[newProps.selectedMarker]) {
        this.state.markers[newProps.selectedMarker]
        .setAnimation(google.maps.Animation.BOUNCE);
      } else if (!newProps.selectedMarker && this.state.markers[this.props.selectedMarker] ) {
        this.state.markers[this.props.selectedMarker]
        .setAnimation(null);
      }
    },

    componentWillUnmount: function() {
      AdventureStore.removeAllAdventuresChangeListener(this._handleChange);
      CurrentUserStore.removeCurrentUserChangeListener(this._setMap);

    },

    _setMap: function() {
      if(!this.state.mapSet)
      this.map.setCenter({ 
        lat: CurrentUserStore.currentUser().lat,
        lng: CurrentUserStore.currentUser().lng })
      this.map.setZoom(7);
      this.setState({ mapSet: true })
    },

    _handleLocationSearch: function() {
      var autocomplete = new google.maps.places.Autocomplete(this.props.placesSearch);
      autocomplete.bindTo('bounds', this.map);
      autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
        this.map.setZoom(7);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(7); 
      }
      this._createBounds();
      }.bind(this))
    },

    _createBounds: function() {
      var mapBounds = this.map.getBounds();
      var center = { lat: this.map.center.lat(), lng: this.map.center.lng()}
      var southWest = mapBounds.getSouthWest();
      var northEast = mapBounds.getNorthEast();
      var newBounds = { 
        northEast: { lat: northEast.lat(), lng: northEast.lng() },
        southWest: { lat: southWest.lat(), lng: southWest.lng() }
      };
      FilterActions.recieveMapBounds(newBounds, center);
    },

    _handleMapIdle: function() {
      this.map.addListener('idle', function() {
        // var bounds = this._createBounds();  
        // // ApiUtil.fetchesBenches(bounds);
        // FilterActions.recieveMapBounds(bounds);
        this._createBounds();
      }.bind(this));
    },

    _handleChange: function() {
      var inBoundAdventures = AdventureStore.all();
      this.clearMarkers();
      inBoundAdventures.forEach(function(adventure) {
        if (this.state.markers[adventure.id] === undefined) {
          this._addAdventure(adventure);
        } else {
          this.state.markers[adventure.id].setMap(this.map);
        }
      }.bind(this))
    },

    _addAdventure: function(adventure) {
      var pos = { lat: adventure.lat, lng: adventure.lng };
      var marker = new google.maps.Marker({
        position: pos, 
        title: adventure.title
      });

      var adventures = {};
      adventures[adventure.id] = marker;
      var newMarks = _.extend({}, this.state.markers, adventures );
      marker.setMap(this.map);
      this.setState( { markers: newMarks })
    },

    clearMarkers: function() {
      _.values(this.state.markers).forEach(function(marker) {
        marker.setMap(null);
      });
    },

    render: function() {
      return (<div className={'map'} ref={'map'}></div>);
    }
  })
})(this)