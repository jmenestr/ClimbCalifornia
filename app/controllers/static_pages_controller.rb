class StaticPagesController < ApplicationController

  before_filter :ensure_current_user
  def root
    render :root
  end

  def ensure_current_user
    redirect_to new_session_url unless current_user
  end
end
