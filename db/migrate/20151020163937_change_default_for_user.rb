class ChangeDefaultForUser < ActiveRecord::Migration
  def change
    change_column_default :users, :lat, 37.7833
    change_column_default :users, :lng, -122.4167
    change_column_default :users, :location, "San Francisco, CA"
  end
end
