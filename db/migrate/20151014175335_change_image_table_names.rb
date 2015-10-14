class ChangeImageTableNames < ActiveRecord::Migration
  def change
    rename_column :images, :imageable_type, :imagable_type
    rename_column :images, :imageable_id, :imagable_id
  end
end
