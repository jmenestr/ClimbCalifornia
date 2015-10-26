class StaticPagesController < ApplicationController

  before_filter :ensure_current_user
  def root
    @google = "https://maps.googleapis.com/maps/api/js?key=#{ENV['GOOGLE_MAPS']}&libraries=places"
    render :root
  end

  def ensure_current_user
    redirect_to new_session_url unless current_user
  end
end
