class AddImageNameColumnToImages < ActiveRecord::Migration
  def change
    add_column :images, :image_name, :string, null: false
  end
end
