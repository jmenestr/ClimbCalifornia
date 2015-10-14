class ChangeFeatureColName < ActiveRecord::Migration
  def change
    change_column :features, :feature, :name
  end
end
