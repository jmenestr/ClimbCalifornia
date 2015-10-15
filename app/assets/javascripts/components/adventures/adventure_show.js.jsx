(function(root){
  root.AdventureShow = React.createClass({

    getInitialState: function() {
      return ({ adventure: AdventureStore.currentAdventure()})
    },

    componentDidMount: function() {
      AdventureStore.addSingleAdventureChangeListener(this._recieveAdventure);
      var id = this.props.params.id;
      ApiUtils.fetchSingleAdventure(id);
    },

    componentWillUnmount: function() {
      AdventureStore.removeSingleAdventureChangeListener(this._recieveAdventure);
    },

    componentWillReceiveProps: function(newProps) {
      ApiUtils.fetchSingleAdventure(newProps.params.id);
    },

    _recieveAdventure: function() {
      this.setState({ adventure: AdventureStore.currentAdventure() });
    },

    _displayLoad: function() {
      return (<div>Loading</div>);
    },

    _displayContent: function() {
      return (
        <div className='adventure-show container'>
          <div className='row'>
            <div class="page-header">
              <h1>{this.state.adventure.title}</h1>
              <span className='sub-head'></span>
            </div>
          </div>
          <div className='row-images'>
              <img src={this.state.adventure.images[0].image_url} />
          </div>
          <div className='row'>
            <article className='adventure-main'>
              <div className='col-md-9'>
                <h5>Added by {this.state.adventure.author.name} </h5>
                <section className='panel panel-success adventure-description'>
                  <div className='panel-heading'>
                    <h3 className='panel-title'>About this Adventure: </h3>
                  </div>
                  <div className='panel-body'>
                    {this.state.adventure.description}
                  </div>
                </section>
              </div>
              <div className='col-md-3'>
                <h3>Features</h3>
                <aside className='article-details well'>
                {this.state.adventure.features.map(function(feature){
                  return (
                    <button className='feature btn btn-success'>
                      {feature.name}
                    </button>
                      )
                })}
                </aside>
              </div>
            </article>
            
            <Reviews adventure={this.state.adventure} />
          </div>
          
        </div>
        )
    },
    render: function() {

      var display;
      if (this.state.adventure == undefined) {
        display = this._displayLoad();
      } else {
        display = this._displayContent();
      }

      return (display);
      }

  })
}(this));








