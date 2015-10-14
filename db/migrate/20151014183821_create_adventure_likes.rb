class CreateAdventureLikes < ActiveRecord::Migration
  def change
    create_table :adventure_likes do |t|
      t.integer :adventure_id, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :adventure_likes, [:adventure_id, :user_id], unique: true
    add_index :adventure_likes, :adventure_id
  end
end
