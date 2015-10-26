 (function(root){
  root.NewList = React.createClass({
    getInitialState: function() {

      return ({ 
        listName: "" })
    },


    handleNameChange: function(e) {
      this.setState({ listName: e.target.value })
    },
    handleListSelection: function(e) {
      this.setState({ selectedList: e.target.value })
    },

    createList: function(e) {
      var title = this.state.listName;
      ApiUtils.createList(title);
      this.setState({  listName: "" })
    },

    renderInput: function() {
      var input, listCount, message;
      
        input = 
        (
          <div className='create-list'>
            <input type='text' 
            value={this.state.listName}
            onChange={this.handleNameChange}
            placeholder='Name the List, then click Create' />
            <button onClick={this.createList} >Create List</button>
          </div>
                )
      
          return input;
    },


    render: function() {
      var input = this.renderInput();
      return (
        <section id="modal" className="modal is-active">
          <div className="modal-content list-form">
            <span onClick={this.props.closeModal} className="modal-close">&times;</span>
            <h5> Create a new List </h5>
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