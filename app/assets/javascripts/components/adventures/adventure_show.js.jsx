(function(root){
  root.AdventureShow = React.createClass({
    render: function() {
      return (
        <div className='adventure-show container'>
          <div className='row'>
            <div class="page-header">
              <h1>{this.state.adventure.title}</h1>
            </div>
          </div>
          <div className='row images'>
          </div>
          <div className='row'>
            <article className='adventure-main'>
              <div className='col-md-8'>
                <section className='adventure-description'>
                </section>
              </div>
              <div className='col-md-4'>
                <aside className='article-details'>
                </aside>
              </div>
            </article>
          </div>
        </div>
        )
    }
  }) 
})(this)