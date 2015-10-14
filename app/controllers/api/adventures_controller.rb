require 'byebug'
class Api::AdventuresController < ApplicationController
  def index
    @adventures = Adventure.index_adventures(params[:filters]) 
    render json: @adventures
  end
end
