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
    @listItem = AdventureList.where(adventure_id: params[:adventure_id]).where(list_id: params[:list_id]).first
    if @listItem.destroy
       render json: @listItem 
    else 
      render json: @listItem, status: 404 
    end

  end

  def list_item_params 
    params.require(:list_item).permit(:list_id, :adventure_id)
  end
end
