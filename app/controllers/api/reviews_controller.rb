require 'byebug'

class Api::ReviewsController < ApplicationController
  def index
    @reviews = 
      Review.where("reviews.adventure_id = ?", params[:adventure_id])
      .includes(:author => :images)
    render :index
  end
end
