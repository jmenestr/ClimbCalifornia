(function(root) {
  root.NavBar = React.createClass({

    getInitialState: function() {
      return ({ currentUserName: CurrentUserStore.currentUser().name })
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
    render: function() {
      return (
        <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle na vigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Climb California</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><Link to={"/"}>Discover Adventure</Link></li>
        <li className=""><Link to={"/explorers"}>Find Explorers</Link></li>
        <li className=""><Link to={"/feed"}>Explore your Feed</Link></li>
      </ul>

      <ul className="nav navbar-nav navbar-right">
        <li><Link  to={"/adventures/new"}>Create Adventure </Link></li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          {CURRENT_USER.name}
           <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link to={'adventures/new'}>New Adventure</Link></li>
            <li><Link to={'/users/' + window.CURRENT_USER.id}>Profile</Link></li>
            <li><Link to={'/settings/'} >Settings</Link></li>
            <li role="separator" className="divider"></li>
            <li>{this.logOutButton()}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
        );
    }
  })
})(this);