(function(root){
  root.FilterDropDown = React.createClass({
    render: function() {
      return (
          <div className='filter-dropdown'>
            <label htmlFor={this.props.title}>{this.props.title} </label> 
            <select multiple={true} id={this.props.title} onChange={this.props.handleSelect}   >
              {this.props.items.map(function(item){
                return (<option key={item.id} value={item.id} >{item.name}</option>);
              })}
            </select>
          </div>
        )
    }
  })
})(this)