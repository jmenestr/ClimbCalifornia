(function(root) {
  root.NavBar = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function() {
      return ({ 
        currentUser: CurrentUserStore.currentUser(),
        activePage: 0,
        active: false })
    },

    componentDidMount: function() {
      CurrentUserStore.addCurrentUserChangeListener(this._handleUserChange);

    },

    componentWillUnmount: function() {
      CurrentUserStore.removeCurrentUserChangeListener(this._handleUserChange);
    },

    _handleUserChange: function() {
      this.setState({ currentUser: CurrentUserStore.currentUser() })
    },

    logOutButton: function() {
      return (
        <form action="/session" method="POST">
          <input type="hidden" name="_method" value="DELETE" />
          <input type="hidden" name="authenticity_token" value={window.csrf} />
          <input type="submit" className="btn btn-warning btn-block" value="Log Out" />
        </form>
        );
    },

    handleClick: function(id, url) {  
      this.history.pushState(null, url);
      this.setState({ activePage: id});
    },

    resetPage: function() {
      this.setState({ activePage: undefined });
    },

    toggleDropdown: function() {
      this.setState({ active: !this.state.active });
    },

    closeDropdown: function() {
      this.setState({ active: false })
    },

    render: function() {
        var discover = "", explorers = "", feed = "", adventure = '';
        switch (this.state.activePage) {
          case 0: 
            discover = 'active';
            break;
          case 1: 
            explorers = 'active';
            break;
          case 2: 
            feed = 'active';
            break;
          case 3:
            adventure = 'active';
            break;
          default: 
            break;
        }

        var caret = '', dropClass = '';
        if (this.state.active) {
          caret = 'fa-caret-square-o-up ';
          dropClass = 'active'
        } else {
          caret = 'fa-caret-square-o-down ';
          dropClass = 'inactive'
        }
        var id = !!this.state.currentUser ?  this.state.currentUser.id : "";
      return (
        <nav id='mainNav'>
          <div className='mainNav-head'>
            <h5>Climb California</h5>
          </div>
          <ul className="nav-left">
              <li className={discover + " cl-effect-4"}><a onClick={this.handleClick.bind(null,0,'/')}>Discover Adventure</a></li>
              <li className={explorers + " cl-effect-4"}><a onClick={this.handleClick.bind(null,1,'/explorers')}>Find Explorers</a></li>
              <li className={feed + " cl-effect-4"}><a onClick={this.handleClick.bind(null,2,'/feed')}>Explore your Feed</a></li>
              <li className={adventure + " cl-effect-4"}><a onClick={this.handleClick.bind(null,3,'/adventures/new')}>+ New Adventure</a></li>
            </ul>

          <div className='nav-right'
            onMouseLeave={this.closeDropdown}>
            <div onClick={this.toggleDropdown} className='drop-toggle'>
              <span>{this.state.currentUser.name}</span>
              <i className={"fa " + caret + "fa-1x"}></i>
            </div>
            <ul 
            className={'dropdown ' + dropClass}>
              <li><Link to={'adventures/new'} onClick={this.resetPage}>New Adventure</Link></li>
              <li><Link to={'/users/' + id } onClick={this.resetPage}>Profile</Link></li>
              <li><Link to={'/settings/'} onClick={this.resetPage} >Settings</Link></li>
              <li>{this.logOutButton()}</li>

            </ul>
 
          </div>
        </nav>


        );
    }
  })
})(this);


