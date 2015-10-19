class Api::FollowsController < ApplicationController

  def create
    @follow = current_user.active_relationships.new(followee_id: params[:user_id])
    if @follow.save 
      render json: @follow 
    else
      render json: @follow.errors.full_messages, status: 404
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy 
    render json: @follow
  end

end
