class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image_url
      t.integer :imageable_id, index: true
      t.string  :imageable_type
      t.timestamps null: false
    end
  end
end
