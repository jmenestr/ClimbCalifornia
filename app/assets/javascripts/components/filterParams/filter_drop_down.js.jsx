(function(root){
  root.FilterDropDown = React.createClass({
    render: function() {
      return (
          <div className='form-group'>
            <label htmlFor={this.props.title}>{this.props.title} </label> 
            <select id={this.props.title} onChange={this.props.handleSelect} className='form-control'  >
              {this.props.items.map(function(item){
                return (<option value={item.id} >{item.name}</option>);
              })}
            </select>
          </div>
        )
    }
  })
})(this)