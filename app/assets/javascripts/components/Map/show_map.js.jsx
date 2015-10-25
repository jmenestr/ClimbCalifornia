(function(root){
  root.ShowMap = React.createClass({

    componentDidMount: function() {
      debugger;
      var map = React.findDOMNode(this.refs.map);

      var mapOptions = {
        center: {lat: this.props.lat, lng: this.props.lng},
        zoom: 13
      };

      this.map = new google.maps.Map(map, mapOptions);
      var marker = new google.maps.Marker({
        position: { lat: this.props.lat, lng: this.props.lng },
        map: this.map
      });
      
    },

    
    render: function() {
      return (<div className='show-map' ref='map'></div>);
    }
  })
})(this)