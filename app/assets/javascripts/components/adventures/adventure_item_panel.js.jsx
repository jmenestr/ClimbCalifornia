(function(root){

  root.AdventurePanel = React.createClass({
    render: function() {
      return (
      <div className='article-details panel panel-info'>
        <div className='panel-heading'>
          <h3 className='panel-title'>{this.props.title} </h3>
        </div>
        <div className='panel-body'>
          {this.props.items.map(function(item){
          return (
            <span key={item.id} className='item-label label label-primary'>
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