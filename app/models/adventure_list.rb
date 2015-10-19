# == Schema Information
#
# Table name: adventure_lists
#
#  id           :integer          not null, primary key
#  adventure_id :integer          not null
#  list_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AdventureList < ActiveRecord::Base
  validates :adventure_id, :list_id, presence: true
  validates :list_id, uniqueness: { scope: :adventure_id }

  belongs_to :adventure 
  belongs_to :list 
end
