(function(root){
  root.AdventureSaveButton = React.createClass({
    
    render: function() {
      return (
            <div className='save-button'>
              <button className='btn btn-sm btn-success'>
                <span className='glyphicon glyphicon-heart-empty'></span>
              </button>
            </div>
        );
    }
  });

})(this)