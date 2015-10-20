(function(root){
  root.Settings = React.createClass({
    getInitialState: function() {
      return ({ 
        name: "",
        currentUser: CurrentUserStore.currentUser() })
    },

    componentDidMount: function() {
      CurrentUserStore.addCurrentUserChangeListener(this._handleChange);
      ApiUtils.fetchCurrentUser();
    },

    componentWillUnmount: function() {
      CurrentUserStore.removeCurrentUserChangeListener(this._handleChange)
    },

    _handleChange: function() {
      this.setState({ currentUser: CurrentUserStore.currentUser() })
    },

    handleNameChange: function(e) {
      this.setState({ name: e.target.value })
    },

    render: function() {
      return (
        <div className='my-account'>
          <div className='header row'>
            <div className='col-sm-8 col-sm-offset-2'>
              <h2> My Account </h2>
              <h5> It's all about you </h5>
            </div>
          </div>
          <div className='user-info'>
            <div className='row'>
              <h3> Basic Info </h3>
              <h5> Add a profile pic to let everyone see your awesomness!</h5>
            </div>
            <form className='user-info-form'>

              <div className='form-group'>
                <label htmlFor='userName'>Your Name</label>
                <input id='userName'
                  className='form-control'
                 type='text' value={this.state.name} onChange={this.handleNameChange} />
              </div>

              <div className='form-group'>
                <label for='location'>Your Location</label>
                <input id='location'
                className='form-control'
                 type='text' value={this.state.name} onChange={this.handleLocationChange} />
              </div>
              <input type='submit' classname
            </form>

          </div>
        </div>
        )
    }
  })
})(this)