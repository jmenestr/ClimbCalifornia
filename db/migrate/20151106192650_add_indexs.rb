class AddIndexs < ActiveRecord::Migration
  def change
    add_index :lists, :user_id
    add_index :adventure_activities, :adventure_id
    add_index :adventure_activities, :activity_id
    add_index :adventures, :user_id
  end
end
