 (function(root){
  root.ModalListForm = React.createClass({
    getInitialState: function() {
      return ({ 
        creatingList: false,
        listName: "",
        selectedList: undefined,
       lists: [] })
    },

    componentDidMount: function() {
      CurrentUserStore.addCurrentUserChangeListener(this._handleListChange);
      ApiUtils.fetchCurrentUser();
    },

    componentWillUnmount: function() {
      CurrentUserStore.removeCurrentUserChangeListener(this._handleListChange);
    },

    _handleListChange: function() {
      this.setState({ lists: CurrentUserStore.currentUser().lists });
    },

    handleNameChange: function(e) {
      this.setState({ listName: e.target.value })
    },
    handleListSelection: function(e) {
      this.setState({ selectedList: e.target.value })
    },

    toggleListCreation: function() {
      this.setState({ creatingList: true })
    },

    listAddition: function() {
      var list_id = this.state.selectedList;
      var adventure_id = this.props.adventureId;
      ApiUtils.createListItem(list_id, adventure_id);
      this.props.closeModal();
    },

    createList: function(e) {
      var title = this.state.listName;
      ApiUtils.createList(title);
      this.setState({ creatingList: false, listName: "" })
    },

    renderInput: function() {
      var input, listCount;
      if (this.state.creatingList) {
        input = 
        (
          <div className='form-group'>
            <input type='text' 
            value={this.state.listName}
            onChange={this.handleNameChange}
            placeholder='Name the List, then click Create' />
            <button onClick={this.createList} className='btn btn-primary' >Create List</button>
          </div>
                )
      } else {
             input =(
              <div className='form-group'>
                <select onChange={this.handleListSelection} id ='list-title' className='form-control'>
                {this.state.lists.map(function(list){
                  return <option value={list.id}>{list.title}</option>          
                })
                }
                </select>
                <button onClick={this.toggleListCreation} className='btn btn-primary'>New List</button>
              </div>
              )   
      }
          return input;
    },


    render: function() {
      var input = this.renderInput();
      return (
        <section id="modal" className="modal is-active">
          <div className="modal-content">
            <span onClick={this.props.closeModal} className="modal-close">&times;</span>
            <form clasName='form-inline'>
                {input}
                <button onClick={this.listAddition} className='btn btn-success btn-block' >
                  Add to List 
                </button>
            </form>
          </div>
          <div className="modal-screen"></div>
        </section>
          );
    }
  });

})(this)