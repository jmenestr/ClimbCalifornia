class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      redirect_to index_url
    else
      flash.now[:errors] = ["The provided password and email do not match. Please try again."]
      render :new
    end
  end

  def guest 
    @user = User.find_by(email: "justin")
    login(@user)
    render json: @user
  end

  def destroy
    current_user.update_session_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end

end
