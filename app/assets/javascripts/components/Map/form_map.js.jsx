(function(root){
  root.FormMap = React.createClass({

    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);

      var mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 1
      };

      this.map = new google.maps.Map(map, mapOptions);
      
    },

    componentWillReceiveProps: function(nextProps) {
      if (nextProps.cords.lat && nextProps.cords.lng) {
        var newCords = { lat: nextProps.cords.lat, lng: nextProps.cords.lng };
        this.map.setCenter(newCords);
        this.map.setZoom(13);
        this.marker = new google.maps.Marker({
          position: newCords,
          map: this.map
        });
      }
    },

    render: function() {
      return (<div className='form-map' ref='map'></div>);
    }
  })
})(this)