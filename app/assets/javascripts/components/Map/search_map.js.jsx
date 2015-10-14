(function(root){
    root.SearchMap = React.createClass({
    getInitialState: function() {
      return { markers: {}, search_not_bound: true };
    },
    
    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);
      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };

      this.map = new google.maps.Map(map, mapOptions);
      this._handleMapIdle();
      
      AdventureStore.addAllAdventuresChangeListener(this._handleChange);
    }, 

    componentWillReceiveProps: function() {
      console.log("new");
      if (this.props.placesSearch !== undefined && this.state.search_not_bound) {
        this._handleLocationSearch();
        this.setState({search_not_bound: false});
      }
    },

    componentWillUnmount: function() {
      AdventureStore.removeAllAdventuresChangeListener(this._handleChange);
    },

    _handleLocationSearch: function() {
      var autocomplete = new google.maps.places.Autocomplete(this.props.placesSearch);
      autocomplete.bindTo('bounds', this.map);
      autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(13); 
      }
      this._createBounds();
      }.bind(this))
    },

    _createBounds: function() {
      var mapBounds = this.map.getBounds();
      var southWest = mapBounds.getSouthWest();
      var northEast = mapBounds.getNorthEast();
      var newBounds = { 
        northEast: { lat: northEast.lat(), lng: northEast.lng() },
        southWest: { lat: southWest.lat(), lng: southWest.lng()}
      };
      FilterActions.recieveMapBounds(newBounds);
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
      console.log("Map REnder")
      return (<div className={'map'} ref={'map'}></div>);
    }
  })
})(this)