class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :content, null: false
      t.integer :rating
      t.integer :adventure_id, null: false, index: true
      t.integer :user_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
