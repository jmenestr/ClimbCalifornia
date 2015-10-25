
class Api::AdventuresController < ApplicationController
  # geocode_ip_address :index

  def index
    @current_local = [current_user.lat, current_user.lng]
    @adventures = Adventure.search_filter(params[:filters])
    .joins("LEFT OUTER JOIN adventure_likes ON adventure_likes.adventure_id = adventures.id").select("adventures.*, COUNT(*) as save_count").group(:id)
    .by_distance(:origin => @current_local)
    .page(params[:page]).per(10).includes(:images, :author, :saves)
    render :index
  end

  def show
    @adventure = Adventure
      .joins("LEFT OUTER JOIN reviews ON reviews.adventure_id = adventures.id")
      .select("adventures.*, AVG(reviews.rating) as avg_rating")
      .group(:id)
      .where("adventures.id = ?", params[:id])
      .includes(:author, :images, :features, :activities, :reviews => {:author => :images}).find(params[:id])
    render :show
  end

  def create
    @adventure = current_user.adventures.new(adventure_params)
    ActiveRecord::Base.transaction do 
      @adventure.images.build(params[:images].values) if params[:images]
      @adventure.save
    end
    if @adventure.id
      render json: @adventure 
    else
      render json: @adventure.errors.full_messages, status: 422
    end
  end

  def update 
    @adventure = Adventure.find(params[:id])
    if @adventure.update(adventure_params)
      render json: @adventure 
    else 
      render @adventure, status: 404
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
      feature_ids: [],
      activity_ids: [],
      list_ids: [])
  end
end
