class Api::ListsController < ApplicationController
  def show
    @current_local = [37.7833, -122.4167]
    @list = List.includes(:images, :user, :adventures => :author).find(params[:id])
    render :show
  end
  
  def create
    @list = current_user.lists.new(list_params)
    if @list.save 
      render json: @list
    else 
      render json: @list.errors.full_messages, status: 404
    end
  end

  def destroy
    @list = List.find(params[:id])
     if current_user.id = @list.user_id 
      @list.destroy
      render json: @list 
    else
      render json: @list, status: 404
    end

  end

  def list_params
    params.require(:list).permit(:title)
  end

end
