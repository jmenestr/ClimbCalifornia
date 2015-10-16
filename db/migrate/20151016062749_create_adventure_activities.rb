class CreateAdventureActivities < ActiveRecord::Migration
  def change
    create_table :adventure_activities do |t|
      t.integer :adventure_id 
      t.integer :activity_id
      t.timestamps null: false  
    end
  end
end
