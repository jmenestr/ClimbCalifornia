(function(root){
  root.Pagination = React.createClass({
    //more pages?
    _renderContent: function() {
      var pagination;
      if (this.props.isFirstPage && this.props.isLastPage ) {
        pagination = ""
      }
      else if (this.props.isFirstPage) {
       pagination = ( <nav>
          <ul className="pager">
            <li onClick={this.props.handlePagination.bind(null, this.props.page + 1)}><a href="javascript:void(0)">Next</a></li>
          </ul>
        </nav>
        )
      } else {
        var next = (!this.props.isLastPage) ? 
        (<li onClick={this.props.handlePagination.bind(null, this.props.page + 1)}><a href="javascript:void(0)">Next</a></li>) : "";
        pagination = (
        <nav>
          <ul className="pager">
            <li onClick={this.props.handlePagination.bind(null, this.props.page - 1)}><a href="javascript:void(0)">Previous</a></li>
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