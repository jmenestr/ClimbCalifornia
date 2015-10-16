class Api::AdventureLikesController < ApplicationController
  def create
    @adventure_like = current_user.adventure_likes.new(like_params)
    @adventure_like.save
    render json: @adventure_like
  end

  def destroy
    @adventure_like = AdventureLike.find(params[:id])
    @adventure_like.destroy 
    render json: @adventure_like
  end

  private 
  def like_params
    params.require(:adventure_like).permit(:adventure_id)
  end
end
