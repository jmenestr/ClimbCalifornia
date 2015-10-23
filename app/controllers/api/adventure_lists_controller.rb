class Api::AdventureListsController < ApplicationController

  def destroy 
    @listItem = AdventureList.where(adventure_id: params[:adventure_id]).where(list_id: params[:list_id]).first
    if @listItem.destroy
       render json: @listItem 
    else 
      render json: @listItem, status: 404 
    end

  end

  def list_item_params 
    params.require(:list_item).permit( :adventure_id, list_ids: [])
  end
end
