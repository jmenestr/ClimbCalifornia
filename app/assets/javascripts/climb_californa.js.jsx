(function (root) {
  
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;
  root.Link = ReactRouter.Link;

  var App = React.createClass({
    render: function() {
      return(
        <div className="container-fluid">
          <NavBar />
          <h1> Climb California </h1>
          {this.props.children}
        </div>
        );
    } 
  });

  var routes = (
      <Route path='/' component={App} >
        <IndexRoute component={Search} />
        <Route path='/adventures/new' component={AdventureForm} />
        <Route path='/adventures/:id' component={AdventureShow} />
        <Route path='/users/:id' component={UserProfile} />
        <Route path='/explorers' component={UserIndex} />
      </Route>
    );

    $(function() {
      var content = document.getElementById('main');
      React.render(<Router>{routes}</Router>, content);
    });

})(this); 