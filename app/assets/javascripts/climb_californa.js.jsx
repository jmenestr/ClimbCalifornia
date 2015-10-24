(function (root) {
  
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;
  root.Link = ReactRouter.Link;

  var App = React.createClass({
    getInitialState: function() {
      return ({ modalActive: false })
    },

    componentDidMount: function() {
      ApiUtils.fetchCurrentUser();
    },

    render: function() {
      var modal;
      if (this.state.modalActive) {
        modal =  renderModal
      }
      return(
        <div className="container-fluid">
          <NavBar />

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
        <Route path='/feed' component={UserFeed} />
        <Route path='/list/:id' component={ListShow} />
        <Route path='/settings' component={Settings} />
      </Route>
    );

    $(function() {
      var content = document.getElementById('main');
      if (content) {
        React.render(<Router>{routes}</Router>, content);  
      }
    });

})(this); 