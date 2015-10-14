(function(root){

  root.CheckBox = React.createClass({
    getInitialState: function() {
      return ( {checked: false} )
    },

    onChange: function(e) {
      this.props.handleCheck(e.target.value);
      this.setState({checked: !this.state.checked})
    },

      render: function() {
        var checked = this.state.checked ? "checked" : "";
        return(
        <div className='check-box'>
          <input 
          onChange={this.onChange}
          type="checkbox" 
          id='checkbox'
          value={this.props.item.id}
          checked={this.state.checked} />
          <label htmlFor='checkbox'>
            {this.props.item.feature}
          </label>
        </div>
        );
      }
    });

  root.DropDownSelect = React.createClass({
    getInitialState: function() {
      return ({ 
        expanded: false });
    },

    _handleClick: function(e) {
      this.setState({ expanded: !this.state.expanded });
    },

    

    _expandedState: function() {
      return (
          <ul>
            {this.props.features.map(function(feature) {
              return (<CheckBox key={feature.id} handleCheck={this.props.handleCheck} item={feature} />);
            }.bind(this))}
          </ul>
        )
    },

    render: function() {
      var dropdown = !this.state.expanded ? "" : this._expandedState();
      return(
        <div className="dropdown">
          <button onClick={this._handleClick} className="btn btn-default" type="button">
            Features 
            <span className="caret"></span>
          </button>
          {dropdown}
        </div>
        );
    }
  });


})(this)