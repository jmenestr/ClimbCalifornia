class RemoveImageName < ActiveRecord::Migration
  def change
    remove_column(:images, :image_name)
  end
end
