require 'byebug'
class Api::AdventuresController < ApplicationController
  def index
    @adventures = Adventure.index_adventures(params[:filters]).includes(:author)
    render :index
  end
end
