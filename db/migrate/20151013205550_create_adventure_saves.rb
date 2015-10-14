class CreateAdventureSaves < ActiveRecord::Migration
  def change
    create_table :adventure_saves do |t|
      t.integer :adventure_id, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :adventure_saves, [:adventure_id, :user_id], unique: true
    add_index :adventure_saves, :adventure_id
  end
end
