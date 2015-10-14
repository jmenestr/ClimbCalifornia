class DropAdventureSaves < ActiveRecord::Migration
  def change
    drop_table :adventure_saves
  end
end
