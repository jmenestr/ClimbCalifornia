require 'byebug'

class Api::ReviewsController < ApplicationController
  def index
    @reviews = 
      Review.where("reviews.adventure_id = ?", params[:adventure_id])
      .includes(:author => :images)
    @average = Review.where("reviews.adventure_id = ?", params[:adventure_id])
      .average(:rating).to_f
    render :index
  end

  def create
    @review = current_user.reviews.new(review_params)
    if @review.save 
      render :create_review
    else
      render json: @review.errors.full_messages, status: 404
    end
  end

  private
  def review_params
    params.require(:review).permit(:adventure_id,:content, :rating)
  end
end
