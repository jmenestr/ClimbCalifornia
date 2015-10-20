 (function(root){
  root.RemoveListItem = React.createClass({
    mixins: [ReactRouter.History],
    _handlelick: function() {
      ApiUtils.deleteListItem(this.props.list_id, this.props.adventure_id)
      // Need adventure_id 
      // Need list_id
    },
    render: function() {
    return (
        <div className='delete-button'>
          <button onClick={this._handlelick} className={'btn btn-sm btn-danger'}>
            Delete Item
          </button>
        </div>
        );
    }
  });

})(this)