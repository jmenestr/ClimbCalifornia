class RemoveNullFromImage < ActiveRecord::Migration
  def change
    change_column_default :images, :image_url, "http://res.cloudinary.com/climb-california/image/upload/v1445363827/rock_climbing_scene_1_x02odj.png"
    change_column_null :images, :image_name, false
  end
end
