class Api::FeaturesController < ApplicationController

  def index
    @features = Feature.all 
    render json: @features
  end

  def create 
    @feature = Feature.new(feature_params)
    @feature.save 
    if @feature.save
      render json: @feature 
    else 
      render json: {}
    end
  end

  private
  def feature_params
    params.require(:feature).permit(:name)
  end
end
