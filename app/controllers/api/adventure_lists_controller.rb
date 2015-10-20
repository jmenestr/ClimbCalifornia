class Api::AdventureListsController < ApplicationController
  def create
    @list_item = AdventureList.new(list_item_params)
    if @list_item.save 
      render json: @list_item
    else
      render json: @list_item, status: 404
    end
  end

  def destroy 

  end

  def list_item_params 
    params.require(:list_item).permit(:list_id, :adventure_id)
  end
end
