class CreateAdventureLists < ActiveRecord::Migration
  def change
    create_table :adventure_lists do |t|
      t.integer :adventure_id, null: false 
      t.integer :list_id, null: false
      t.timestamps null: false
    end
    add_index :adventure_lists, :adventure_id
    add_index :adventure_lists, :list_id
    add_index :adventure_lists, [:list_id, :adventure_id], unique: true
  end
end
