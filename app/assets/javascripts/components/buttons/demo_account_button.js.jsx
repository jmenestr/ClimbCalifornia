(function(root){
  root.DemoButton = React.createClass({
    mixins: [ReactRouter.History],
    handleClick: function() {
      ApiUtils.guestLogin();
    },


    render: function() {
      return (
        <button 
        onClick={this.handleClick} 
        className='form-button hover-button'>
          Demo User
        </button>
        )
    }
  });


  $(function() {
    demoButton = document.getElementById('demo-button')
    if (demoButton) {
      React.render(<DemoButton />, demoButton);
    }
  })
})(this)