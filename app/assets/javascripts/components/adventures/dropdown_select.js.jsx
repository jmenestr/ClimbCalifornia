(function(root){

  root.CheckBox = React.createClass({
    getInitialState: function() {
      return ( {checked: false} )
    },

    onChange: function(e) {
      debugger;
      this.props.handleCheck(e.target.value);
      this.setState({checked: !this.state.checked})
    },

      render: function() {
        var checked = this.state.checked ? "checked" : "";
        return(
        <div>
          <input 
          onChange={this.onChange}
          type="checkbox" 
          value={this.props.item.id}
          checked={this.state.checked} />
          {this.props.item.feature}
        </div>
        );
      }
    });

  root.DropDownSelect = React.createClass({
    getInitialState: function() {
      return ({ 
        expanded: false,
        selected: [] });
    },

    _handleClick: function(e) {
      this.setState({ expanded: !this.state.expanded });
    },

    _handleCheck: function(e) {
      var indx = this.state.selected.indexOf(e.target.value);
      debugger;
      if (indx == -1) {
        this.setState({ selected: this.state.selected.concat(e.target.value)})
      } else {
        this.state.selected.splice(indx, 1);
        this.setState({ selected: this.state.selected })
      }
    },

    _expandedState: function() {
      debugger;
      return (
          <ul>
            {this.props.features.map(function(feature) {
              return (<CheckBox handleCheck={this._handleCheck} item={feature} />);
            }.bind(this))}
          </ul>
        )
    },

    render: function() {
      var dropdown = !this.state.expanded ? "" : this._expandedState();
      return(
        <div className="dropdown">
          <button onClick={this._handleClick} className="btn btn-default" type="button">
            Dropdown
            <span className="caret"></span>
          </button>
          {dropdown}
        </div>
        );
    }
  });


})(this)