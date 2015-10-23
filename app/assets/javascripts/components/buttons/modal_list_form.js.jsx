 (function(root){
  root.ModalListForm = React.createClass({
    getInitialState: function() {

      return ({ 
        creatingList: false,
        listName: "",
        selectedLists: [],
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
      var lists = CurrentUserStore.currentUser().lists, selected;
        if(lists.length > 0) {
          selected = lists[0].id
        } else {
          lists = [];
          selected = [];
        }   
      
      this.setState({ 
        selectedList: selected,
        lists: lists });
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
      var listids = this.state.selectedLists.concat("");
      var adventure_id = this.props.adventureId;
      ApiUtils.createListItems(adventure_id, listids);
      this.props.closeModal();
    },

    createList: function(e) {
      var title = this.state.listName;
      ApiUtils.createList(title);
      this.setState({ creatingList: false, listName: "" })
    },

    handleListClick: function(listId) {
      var idx = this.state.selectedLists.indexOf(listId);
      if (idx == -1) {
        this.state.selectedLists.push(listId);
      } else {
        this.state.selectedLists.splice(idx, 1);
      }
        this.setState({ selectedLists: this.state.selectedLists });
    },

    handleToggle: function() {
      this.setState({ dropActive: !this.state.dropActive})
    },

    createDropdown: function() {
      return (
          <div className='list-dropdown'>
            {this.state.lists.map(function(list){
              var checked = (this.state.selectedLists.indexOf(list.id) == -1) ? "" : true;
              return (<div key={list.id}>
                 <div
                  onClick={this.handleListClick.bind(null, list.id)}
                  className='checkbox'>
                <input type ='checkbox' 
                value={list.id} 
                checked={checked}/>
                <span>{list.title}</span>
                 <br />
              </div>
                </div>)
              }.bind(this)
            )}
          </div>
        );
      },

    renderInput: function() {
      var input, listCount, message;
      if (this.state.creatingList || this.state.lists.length == 0) {
        input = 
        (
          <div className='create-list'>
            <input type='text' 
            value={this.state.listName}
            onChange={this.handleNameChange}
            placeholder='Name the List, then click Create' />
            <button onClick={this.createList}  >Create List</button>
          </div>
                )
      } else  {
            var dropdown = (this.state.dropActive) ? this.createDropdown() : ""
             input =(
              <div className='select-list cf'>
                <div className='add-list'>
                  <button onClick={this.listAddition}>
                    Add to List 
                  </button>
                </div>
                <div className='dropdown cf '>
                  <div className='dropdown-toggle' onClick={this.handleToggle}>
                    <h4>Select List</h4>
                  </div>
                  {dropdown}
                    <div className='new-list'>
                      <button onClick={this.toggleListCreation} >New List</button>
                    </div>
                  </div>
                </div>
              )   
      }
          return input;
    },


    render: function() {
      var input = this.renderInput();
      return (
        <section id="modal" className="modal is-active">
          <div className="modal-content list-form">
            <span onClick={this.props.closeModal} className="modal-close">&times;</span>
            <h5> Add your Adventure to Custom Lists! </h5>
            <div>
                {input}
            </div>
          </div>
          <div className="modal-screen"></div>
        </section>
          );
    }
  });

})(this)