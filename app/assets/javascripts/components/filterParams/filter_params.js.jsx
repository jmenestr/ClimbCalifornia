(function(root){
  root.FilterParams = React.createClass({
    getInitialState: function() {
      return { 
        currentFilterParams: {}
      }
    }, 

    // componentDidMount: function() {
    //   FilterParamsStore.addFilterChangeEventListener(this._handeFilterChange)
    // },
    // componentWillMount: function() {
    //   FilterParamsStore.removeFilterChangeEventListener(this._handeFilterChange)
    // },

    // _handeFilterChange: function() {
    //   this.setState({ currentFilterParams})
    // },

    render: function() {
      return (<div>Filter Params</div>);
    }
  })
})(this)