(function(root){
  root.AdventureForm = React.createClass({


    getInitialState: function() {
      return { 
        description: "Give the skinny of your trip",
        features: FeatureStore.all() };
    },
    componentDidMount: function() {
      FeatureStore.addFeatureChangeListener(function() {
        this.setState({ features: FeatureStore.all() });
      }.bind(this))
      ApiUtils.fetchFeatures();
    },

    render: function() {
      return (

        <div className='adventure_form container'>
          <div className='row'>
            <div className='col-md-7'>
              <form>
                <input className={'form-control'} type="text" value={'Enter your Adventure Title'} />
                <p className={'place_choice'}>Choose a Location </p>

                <div className={'imageUpload'}> Upload Here </div>

                <div className={'form-group'}>
                  <label htmlFor={'description'}>Description </label>
                  <textarea 
                  id="description" 
                  className="form-control"
                  value={this.state.description}
                   rows="4"></textarea>          
                </div>
                <input type="submit" value="Create" className='btn btn-success' />
              </form>
            </div> 
          </div>
          <DropDownSelect features={this.state.features} />
        </div>)
    }
  }) 
})(this)
