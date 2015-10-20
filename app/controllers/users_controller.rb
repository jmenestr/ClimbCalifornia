require 'byebug'
class UsersController < ApplicationController
  before_filter :require_current_user, only: [:profile, :show, :index]

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

  def index 
    # @users = User.all.includes(:images)
    @users = User.search(params[:name], params[:activities]).includes(:images, :followers)
    # @users = @users.where("users.id != ? ", current_user.id)
    render :index
  end

  def show
    @current_local = [37.7833, -122.4167]
    @user = User.where("users.id = ?", params[:id])
    .includes(:images, :adventures => :images, :saved_adventures => :images, :lists => :images).first
    render :show
  end

  def feed 
    @current_local = [37.7833, -122.4167]
    @feed = User.feed(current_user)
    render :feed
  end

  def current
    @current_user = User.where("users.id = ? ", current_user.id).includes(:lists).first
    render :current 
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def require_current_user 
    redirect_to new_session_url unless current_user
  end
end
