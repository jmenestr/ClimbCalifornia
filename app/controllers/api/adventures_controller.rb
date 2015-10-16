
require 'byebug'
class Api::AdventuresController < ApplicationController
  # geocode_ip_address :index

  def index
    @current_local = [37.7833, -122.4167]
    @adventures = Adventure.search_filter(params[:filters])
    @adventures.by_distance(:origin => @current_local).includes(:images, :author, :adventure_saves)
    render :index
  end

  def show
    @adventure = Adventure
      .joins("LEFT OUTER JOIN reviews ON reviews.adventure_id = adventures.id")
      .select("adventures.*, AVG(reviews.rating) as avg_rating")
      .group(:id)
      .where("adventures.id = ?", params[:id])
      .includes(:author, :images, :features, :reviews => {:author => :images}).find(params[:id])
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
