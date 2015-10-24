 (function(root){
  root.DeleteListButton = React.createClass({
    mixins: [ReactRouter.History],
    _handlelick: function() {
      ApiUtils.deleteList(this.props.list_id)
      this.history.pushState('/u')
    },
    render: function() {
    return (
        <div className='delete-button'>
          <button onClick={this._handlelick} className={'btn btn-sm btn-danger'}>
            Delete List
          </button>
        </div>
        );
    }
  });

})(this)