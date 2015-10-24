(function(root){
  root.Pagination = React.createClass({
    //more pages?
    _renderContent: function() {
      var pagination;
      if (this.props.page == 1 ) {
       pagination = ( <nav>
          <ul className="pager">
            <li onClick={this.props.handlePagination.bind(null, this.props.page + 1)}><a href="#">Next</a></li>
          </ul>
        </nav>
        )
      } else {
        var next = (this.props.morePages) ? 
        (<li onClick={this.props.handlePagination.bind(null, this.props.page + 1)}><a href="#">Next</a></li>) : "";
        pagination = (
        <nav>
          <ul className="pager">
            <li onClick={this.props.handlePagination.bind(null, this.props.page - 1)}><a href="#">Previous</a></li>
            {next}
          </ul>
        </nav>
        )
      }
      return pagination;
    },



    render: function() {
      var pagination = this._renderContent();
      return (<div>{pagination}</div>)
    }
  })
})(this)