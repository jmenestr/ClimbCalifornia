class CreateAdventureFeatures < ActiveRecord::Migration
  def change
    create_table :adventure_features do |t|
      t.integer :adventure_id, null: false
      t.integer :feature_id, null: false
      t.timestamps null: false
    end
    add_index :adventure_features, [:adventure_id, :feature_id], unique: true
    add_index :adventure_features, :adventure_id
  end
end
