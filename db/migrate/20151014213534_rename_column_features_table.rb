class RenameColumnFeaturesTable < ActiveRecord::Migration
  def change
    rename_column :features, :feature, :name
  end
end
