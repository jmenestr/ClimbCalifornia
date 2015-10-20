(function(root){
  root.AdventureShow = React.createClass({

    getInitialState: function() {
      return ({ 
        adventure: AdventureStore.currentAdventure(),
        averageScore: 3
      })
    },

    componentDidMount: function() {
      AdventureStore.addSingleAdventureChangeListener(this._recieveAdventure);
      ReviewStore.addReviewChangeListener(this._handleReviewScoreChange);
      var id = this.props.params.id;
      ApiUtils.fetchSingleAdventure(id);
    },

    componentWillUnmount: function() {
      AdventureStore.removeSingleAdventureChangeListener(this._recieveAdventure);
      ReviewStore.removeReviewChangeListener(this._handleReviewScoreChange);

    },

    _handleReviewScoreChange: function() {
      this.setState({ averageScore: ReviewStore.averageScore()})
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
        <div className='adventure-show container cf'>
          <div className='row'>
            <div class="page-header">
              <h1>{this.state.adventure.title}</h1>
            </div>
            <div className='row cf'>
              <div className='col-md-9'>
                <StarRatingList 
                rating={this.state.averageScore} 
                max={5} readOnly={true} />
              </div>
              <div className='col-md-3'>
                <ListButton adventureId={this.state.adventure.id} />
                <h5>Like this Adventure!</h5>
                <AdventureSaveButton
                adventure_id={this.props.params.id}
                current_user_save={this.state.adventure.current_user_save}
                />
              </div>
            </div>
          </div>
          <div className='row-images'>
              <img src={this.state.adventure.images[0].image_url} />
          </div>
            <div className='row col-md-12'>
              <h5>Added by <Link 
                to={'users/'+ this.state.adventure.author.id}>
                {this.state.adventure.author.name}</Link> </h5>

            </div>

            <div className='row'>
              <article className='adventure-main cf'>
                <div className='col-md-9'>

                  <section className='panel panel-primary adventure-description'>
                    <div className='panel-heading'>
                      <h3 className='panel-title'>About this Adventure: </h3>
                    </div>
                    <div className='panel-body'>
                      {this.state.adventure.description}
                    </div>
                  </section>

                </div>
                <div className='col-md-3'>

                  <div className='row'>
                    <AdventurePanel title={"Features"} items={this.state.adventure.features} />
                  </div>
                  <div className='row'>
                    <AdventurePanel title={'Activities'} items={this.state.adventure.activities} />
                  </div>
                </div>
              </article>
            
              <section className='reviews'>
                <Reviews adventureId={this.state.adventure.id} />
                <ReviewForm adventureId={this.state.adventure.id} />
              </section>
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








