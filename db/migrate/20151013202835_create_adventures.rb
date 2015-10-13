class CreateAdventures < ActiveRecord::Migration
  def change
    create_table :adventures do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :user_id, null: false
      t.float :lat, null: false
      t.float :lng, null: false 
      t.string :string, null: false
      t.timestamps null: false
    end
  end
end
