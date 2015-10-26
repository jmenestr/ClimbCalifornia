(function(root){
  root.ShowMap = React.createClass({

    componentDidMount: function() {
      var map = React.findDOMNode(this.refs.map);

      var mapOptions = {
        center: {lat: this.props.lat, lng: this.props.lng},
        zoom: 13
      };

      this.map = new google.maps.Map(map, mapOptions);
      this.marker = new google.maps.Marker({
        position: { lat: this.props.lat, lng: this.props.lng },
        map: this.map
      });
      
    },

    componentWillReceiveProps: function(newProps) {
      this.map.setCenter({ lat: newProps.lat, lng: newProps.lng });
      this.marker.setPosition({ lat: newProps.lat, lng: newProps.lng });
    },

    
    render: function() {
      return (<div className='show-map' ref='map'></div>);
    }
  })
})(this)