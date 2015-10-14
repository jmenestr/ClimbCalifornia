(function(root){
  root.AdventureIndexItem = React.createClass({
    render: function() {
      return (
        <div className={'index-item thumbnail'}>
          <p>{this.props.adventure.title}</p>
          <p>{this.props.adventure.location_name}</p>
        </div>)
    }
  }) 
})(this)
