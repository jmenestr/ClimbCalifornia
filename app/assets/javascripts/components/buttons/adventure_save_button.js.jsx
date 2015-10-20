 (function(root){
  root.AdventureSaveButton = React.createClass({

    _handleSaveClick: function(e) {
      if(!!this.props.current_user_save) {
        var save_id = 
          this.props.current_user_save.id;
        //unsave
        ApiUtils.deleteAdventureSave(save_id)
      } else {
        //save
        ApiUtils.createAdventureSave(this.props.adventure_id)
      }
    },

    render: function() {
      var saved = !!this.props.current_user_save;
      var glyphicon, button;
      if (saved) {
          button = "btn-danger";
          glyphicon = "glyphicon-remove"
        } else {
          button = "btn-success";
          glyphicon = "glyphicon-heart"
        }
    return (
        <div className='save-button'>
          <button onClick={this._handleSaveClick} className={'btn btn-sm ' + button}>
            <span className={'glyphicon ' + glyphicon}></span>
          </button>
        </div>
        );
    }
  });

})(this)