(function(root){

  root.AdventurePanel = React.createClass({
    render: function() {
      return (
      <div className='article-details panel panel-success'>
        <div className='panel-heading'>
          <h3 className='panel-title'>{this.props.title} </h3>
        </div>
        <div className='panel-body'>
          {this.props.items.map(function(item){
          return (
            <span key={item.id} className='tag'>
              {item.name}
            </span>
              )
          })}
        </div>
      </div>
        );
    
    }
  })
})(this)