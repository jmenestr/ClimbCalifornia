class CreateClimbStyles < ActiveRecord::Migration
  def change
    create_table :climb_styles do |t|
      t.string :name, null: false
      t.timestamps null: false
    end
  end
end
