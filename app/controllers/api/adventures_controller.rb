require 'byebug'
class Api::AdventuresController < ApplicationController
  def index
    @adventures = Adventure.index_adventures(params[:filters]).includes(:images, :author)
    render :index
  end

  def show
    @adventure = Adventure.includes(:author, :images, :features).find(params[:id])
    render :show
  end

  def create
    @adventure = current_user.adventures.new
    ActiveRecord::Base.transaction do 
      @adventure.update(adventure_params)
      @adventure.images.create(params[:images].values) if params[:images]
    end
    if @adventure.id
      render json: @adventure 
    else
      render json: @adventure.errors.full_messages
    end
  end

  private
  def adventure_params
    params.require(:adventure).permit(
      :title,
      :lat,
      :lng,
      :description,
      :location_name,
      feature_ids: [])
  end
end
