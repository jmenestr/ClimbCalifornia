require 'byebug'
class UsersController < ApplicationController
  before_filter :require_current_user, only: [:profile]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to index_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @current_local = [37.7833, -122.4167]
    @user = User.where("users.id = ?", params[:id]).includes(:images, :adventures => :images, :saved_adventures => :images).first
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def require_current_user 
    redirect_to new_session_url unless current_user
  end
end
