class UsersController < ApplicationController
  before_filter :require_current_user, only: [:profile, :show, :index]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.images.create
      login(@user)
      redirect_to index_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def index 
    @users = User.search(params[:name], params[:activities])
      .page(params[:page]).per(10).includes(:images, :followers)
    @first_last_page = first_last_pages(@users)
    render :index
  end

  def update 
    has_images = !current_user.images.empty?
    ActiveRecord::Base.transaction do 
      current_user.update(edit_user_params)
      if has_images
        current_user.images.first.update(image_url: params[:image_url])
      else
        current_user.images.create(image_url: params[:image_url])
      end
    end
    render :current
  end

  def show
    @current_local = [current_user.lat, current_user.lng]
    @user = User.where("users.id = ?", params[:id])
    .includes(
      :images, :adventures => [ :adventure_likes, :images ],
      :saved_adventures => [ :adventure_likes, :images ],
      :lists => :images).first
    render :show
  end

  def feed 
    @current_local = [current_user.lat, current_user.lng]
    @feed = User.feed(current_user).page(params[:page]).per(10)
    @first_last_pages = first_last_pages(@feed)
    render :feed
  end

  def current
    @current_user = User.where("users.id = ? ", current_user.id).includes(:lists, :images).first
    render :current 
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def edit_user_params 
    params.require(:user).permit(:name, :lat, :lng, :location, :id)
  end

  def require_current_user 
    redirect_to new_session_url unless current_user
  end


end
